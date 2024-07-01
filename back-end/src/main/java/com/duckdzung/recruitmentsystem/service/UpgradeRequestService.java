package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.exception.InvalidRequestException;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Candidate;
import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.Member;
import com.duckdzung.recruitmentsystem.model.UpgradeRequest;
import com.duckdzung.recruitmentsystem.model.enums.RequestStatus;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.duckdzung.recruitmentsystem.repository.CandidateRepository;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import com.duckdzung.recruitmentsystem.repository.MemberRepository;
import com.duckdzung.recruitmentsystem.repository.UpgradeRequestRepository;
import com.duckdzung.recruitmentsystem.util.InputValidator;
import com.duckdzung.recruitmentsystem.util.UserIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UpgradeRequestService {

    @Autowired
    private UpgradeRequestRepository upgradeRequestRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Transactional
    public UpgradeRequest createUpgradeRequest(String memberId, UpgradeRequest upgradeRequest) {
        String validationError = InputValidator.isValidPhoneNumber(truncateSpaceFromPhoneNumber(upgradeRequest.getPhoneNumber())) ? null : "Invalid phone number format";
        if (validationError != null) {
            throw new InvalidRequestException(validationError);
        }

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        if (member.getRole() != Role.MEMBER) {
            throw new InvalidRequestException("Member can only upgrade their account once");
        }
        UpgradeRequest request;
        if (upgradeRequest.getRole() == Role.CANDIDATE) {
            request = UpgradeRequest.builder()
                    .member(member)
                    .name(upgradeRequest.getName())
                    .address(upgradeRequest.getAddress())
                    .phoneNumber(truncateSpaceFromPhoneNumber(upgradeRequest.getPhoneNumber()))
                    .status(RequestStatus.PENDING)
                    .role(Role.CANDIDATE)
                    .build();
        } else if (upgradeRequest.getRole() == Role.ENTERPRISE) {
            request = UpgradeRequest.builder()
                    .member(member)
                    .name(upgradeRequest.getName())
                    .address(upgradeRequest.getAddress())
                    .phoneNumber(truncateSpaceFromPhoneNumber(upgradeRequest.getPhoneNumber()))
                    .companyName(upgradeRequest.getCompanyName())
                    .taxCode(upgradeRequest.getTaxCode())
                    .status(RequestStatus.PENDING)
                    .role(Role.ENTERPRISE)
                    .build();
        } else {
            throw new InvalidRequestException("Invalid role");
        }
        upgradeRequestRepository.save(request);
        return request;
    }

    @Transactional
    public void approveRequest(int requestId) {
        UpgradeRequest request = upgradeRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid request ID"));

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new IllegalArgumentException("Request has already been processed");
        }

        request.setStatus(RequestStatus.APPROVED);
        upgradeRequestRepository.save(request);

        Member member = request.getMember();
        member.setRole(request.getRole());
        member.setName(request.getName());
        member.setAddress(request.getAddress());
        member.setPhoneNumber(request.getPhoneNumber());
        member.setIsValidated(true);
        memberRepository.save(member);

        if (request.getRole() == Role.CANDIDATE) {
            createCandidate(member);
        } else {
            createEnterprise(member, request);
        }
    }

    @Transactional
    public void rejectRequest(int requestId) {
        UpgradeRequest request = upgradeRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid request ID"));

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new IllegalArgumentException("Request has already been processed");
        }

        request.setStatus(RequestStatus.REJECTED);
        upgradeRequestRepository.save(request);
    }


    private void createCandidate(Member member) {
        Candidate candidate = Candidate.builder()
                .id(UserIDGenerator.generateUserID(Role.CANDIDATE))
                .member(member)
                .build();
        candidateRepository.save(candidate);
    }

    private void createEnterprise(Member member, UpgradeRequest request) {
        Enterprise enterprise = Enterprise.builder()
                .id(UserIDGenerator.generateUserID(Role.ENTERPRISE))
                .member(member)
                .companyName(request.getCompanyName())
                .taxCode(request.getTaxCode())
                .build();
        enterpriseRepository.save(enterprise);
    }

    public Page<UpgradeRequest> getAllRequests(Pageable pageable) {
        return upgradeRequestRepository.findAll(pageable);
    }

    private String truncateSpaceFromPhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("\\s+", "");
    }

}
