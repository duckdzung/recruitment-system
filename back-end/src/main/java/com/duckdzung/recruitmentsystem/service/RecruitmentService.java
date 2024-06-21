package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.RecruitmentFormRequest;
import com.duckdzung.recruitmentsystem.common.RecruitmentFormResponse;
import com.duckdzung.recruitmentsystem.exception.InvalidRequestException;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.*;
import com.duckdzung.recruitmentsystem.repository.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class RecruitmentService {
    private final RecruitmentInformationRepository recruitmentInformationRepository;
    private final RecruitmentDetailsRepository recruitmentDetailsRepository;
    private final NomineeRepository nomineeRepository;
    private final AdvertisingFormRepository advertisingFormRepository;
    private final EnterpriseRepository enterpriseRepository;

    public RecruitmentService(RecruitmentInformationRepository recruitmentInformationRepository,
                              RecruitmentDetailsRepository recruitmentDetailsRepository,
                              NomineeRepository nomineeRepository,
                              AdvertisingFormRepository advertisingFormRepository,
                              EnterpriseRepository enterpriseRepository) {
        this.recruitmentInformationRepository = recruitmentInformationRepository;
        this.recruitmentDetailsRepository = recruitmentDetailsRepository;
        this.nomineeRepository = nomineeRepository;
        this.advertisingFormRepository = advertisingFormRepository;
        this.enterpriseRepository = enterpriseRepository;
    }

    @Transactional(rollbackOn = SQLException.class)
    public RecruitmentFormResponse createRecruitmentInformation(String memberId, RecruitmentFormRequest recruitmentFormRequest) {
        validateRecruitmentForm(recruitmentFormRequest);

        Enterprise enterprise = getEnterpriseByMemberId(memberId);

        Nominee nominee = getOrSaveNominee(recruitmentFormRequest.getRecruitmentDetails().getNominee());

        RecruitmentInformation recruitmentInformation = recruitmentFormRequest.getRecruitmentDetails().getRecruitmentInformation();
        recruitmentInformation.setEnterprise(enterprise);
        recruitmentInformation = recruitmentInformationRepository.save(recruitmentInformation);

        AdvertisingForm advertisingForm = recruitmentFormRequest.getAdvertisingForm();
        advertisingForm.setRecruitmentInformation(recruitmentInformation);
        advertisingFormRepository.save(advertisingForm);

        RecruitmentDetails recruitmentDetails = recruitmentFormRequest.getRecruitmentDetails();
        recruitmentDetails.setNominee(nominee);
        recruitmentDetails.setRecruitmentInformation(recruitmentInformation);

        checkRecruitmentDetailsExistence(recruitmentDetails, nominee, advertisingForm, enterprise);

        recruitmentDetails = recruitmentDetailsRepository.save(recruitmentDetails);
        return RecruitmentFormResponse.builder()
                .recruitmentDetails(recruitmentDetails)
                .advertisingForm(advertisingForm)
                .build();
    }

    @Transactional
    public RecruitmentFormResponse updateRecruitmentInformation(int id, RecruitmentFormRequest recruitmentFormRequest) {
        validateRecruitmentForm(recruitmentFormRequest);

        RecruitmentInformation recruitmentInformation = recruitmentInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment information not found"));

        Enterprise enterprise = recruitmentInformation.getEnterprise();

        Nominee nominee = getOrSaveNominee(recruitmentFormRequest.getRecruitmentDetails().getNominee());

        RecruitmentDetails recruitmentDetails = recruitmentFormRequest.getRecruitmentDetails();
        recruitmentDetails.setNominee(nominee);
        recruitmentDetails.setRecruitmentInformation(recruitmentInformation);

        AdvertisingForm advertisingForm = recruitmentFormRequest.getAdvertisingForm();
        advertisingForm.setRecruitmentInformation(recruitmentInformation);

        checkRecruitmentDetailsExistence(recruitmentDetails, nominee, advertisingForm, enterprise);

        recruitmentDetails = recruitmentDetailsRepository.save(recruitmentDetails);
        advertisingFormRepository.save(advertisingForm);
        return RecruitmentFormResponse.builder()
                .recruitmentDetails(recruitmentDetails)
                .advertisingForm(advertisingForm)
                .build();
    }

    public Page<RecruitmentFormResponse> getAllRecruitments(Pageable pageable) {
        return recruitmentDetailsRepository.findAll(pageable).map(recruitmentDetails -> RecruitmentFormResponse.builder()
                .recruitmentDetails(recruitmentDetails)
                .advertisingForm(advertisingFormRepository.findByRecruitmentInformation(recruitmentDetails.getRecruitmentInformation()))
                .build());
    }

    @Transactional
    public RecruitmentFormResponse getRecruitmentInformationById(int id) {
        RecruitmentInformation recruitmentInformation = recruitmentInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment information not found"));
        return getRecruitmentFormResponse(recruitmentInformation);

    }

    public Page<RecruitmentFormResponse> getRecruitmentsByNominee(String position, Pageable pageable) {
        return recruitmentDetailsRepository.findByNominee_Position(position, pageable).map(recruitmentDetails -> RecruitmentFormResponse.builder()
                .recruitmentDetails(recruitmentDetails)
                .advertisingForm(advertisingFormRepository.findByRecruitmentInformation(recruitmentDetails.getRecruitmentInformation()))
                .build());
    }

    public Page<RecruitmentFormResponse> getRecruitmentsByEnterpriseAddress(String address, Pageable pageable) {
        return recruitmentInformationRepository.findByEnterprise_Member_Address(address, pageable).map(this::getRecruitmentFormResponse);
    }

    private RecruitmentFormResponse getRecruitmentFormResponse(RecruitmentInformation recruitmentInformation) {
        RecruitmentDetails recruitmentDetails = recruitmentDetailsRepository.findByRecruitmentInformation(recruitmentInformation);
        if (recruitmentDetails == null) {
            throw new ResourceNotFoundException("Recruitment details not found");
        }
        AdvertisingForm advertisingForm = advertisingFormRepository.findByRecruitmentInformation(recruitmentInformation);
        if (advertisingForm == null) {
            throw new ResourceNotFoundException("Advertising form not found");
        }
        return RecruitmentFormResponse.builder()
                .recruitmentDetails(recruitmentDetails)
                .advertisingForm(advertisingForm)
                .build();
    }

    public Page<RecruitmentFormResponse> getRecruitmentsByNomineeAndAddress(String position, String address, Pageable pageable) {
        return recruitmentDetailsRepository.findByNominee_PositionAndRecruitmentInformation_Enterprise_Member_Address_Fuzzy(position, address, pageable)
                .map(recruitmentDetails -> RecruitmentFormResponse.builder()
                        .recruitmentDetails(recruitmentDetails)
                        .advertisingForm(advertisingFormRepository.findByRecruitmentInformation(recruitmentDetails.getRecruitmentInformation()))
                        .build());
    }

    @Transactional
    public void deleteRecruitmentInformation(int id) {
        RecruitmentInformation recruitmentInformation = recruitmentInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment information not found"));
        recruitmentInformationRepository.delete(recruitmentInformation);
    }

    private Enterprise getEnterpriseByMemberId(String memberId) {
        Enterprise enterprise = enterpriseRepository.findByMemberId(memberId);
        if (enterprise == null) {
            throw new ResourceNotFoundException("Enterprise not found");
        }
        return enterprise;
    }

    private Nominee getOrSaveNominee(@NotBlank Nominee nominee) {
        Nominee existingNominee = nomineeRepository.findByPosition(nominee.getPosition());
        if (existingNominee != null) {
            return existingNominee;
        }
        return nomineeRepository.save(nominee);
    }

    private void validateRecruitmentForm(RecruitmentFormRequest recruitmentFormRequest) {
        isRecruitmentTimeValid(recruitmentFormRequest.getAdvertisingForm());
        isRecruitmentDetailsValid(recruitmentFormRequest.getRecruitmentDetails());
    }

    private void isRecruitmentDetailsValid(RecruitmentDetails recruitmentDetails) {
        if (recruitmentDetails.getQuantity() <= 0) {
            throw new InvalidRequestException("Quantity must be greater than 0");
        }
        if (recruitmentDetails.getRequiredInfo().length() > 50) {
            throw new InvalidRequestException("Required info must be less than 50 characters");
        }
    }

    private void isRecruitmentTimeValid(AdvertisingForm advertisingForm) {
        if (advertisingForm.getRecruitmentTime().isBefore(LocalDateTime.now())) {
            throw new InvalidRequestException("Recruitment time must be in the future");
        }
    }

    private void checkRecruitmentDetailsExistence(RecruitmentDetails recruitmentDetails, Nominee nominee, AdvertisingForm advertisingForm, Enterprise enterprise) {
        List<RecruitmentDetails> existingRecruitmentDetails = recruitmentDetailsRepository.findByNomineeAndMemberId(nominee, enterprise.getId());
        for (RecruitmentDetails existingDetails : existingRecruitmentDetails) {
            if (existingDetails.equals(recruitmentDetails) &&
                    advertisingFormRepository.existsByRecruitmentInformationAndRecruitmentTimeAndAdvertisingType(
                            existingDetails.getRecruitmentInformation(), advertisingForm.getRecruitmentTime(), advertisingForm.getAdvertisingType())) {
                throw new InvalidRequestException("Recruitment details already exist");
            }
        }
    }
}
