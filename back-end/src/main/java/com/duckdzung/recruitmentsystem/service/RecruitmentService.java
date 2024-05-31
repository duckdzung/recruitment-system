package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.RecruitmentFormRequest;
import com.duckdzung.recruitmentsystem.common.RecruitmentFormResponse;
import com.duckdzung.recruitmentsystem.exception.InvalidRequestException;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.*;
import com.duckdzung.recruitmentsystem.repository.*;
import jakarta.transaction.Transactional;
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

    public RecruitmentInformation getRecruitmentInformationById(int id) {
        return recruitmentInformationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recruitment information not found"));
    }

    public void deleteRecruitmentInformation(int id) {
        recruitmentInformationRepository.deleteById(id);
    }

    private Enterprise getEnterpriseByMemberId(String memberId) {
        Enterprise enterprise = enterpriseRepository.findByMemberId(memberId);
        if (enterprise == null) {
            throw new ResourceNotFoundException("Enterprise not found");
        }
        return enterprise;
    }

    private Nominee getOrSaveNominee(Nominee nominee) {
        Nominee existingNominee = nomineeRepository.findByPosition(nominee.getPosition());
        if (existingNominee != null) {
            return existingNominee;
        }
        return nomineeRepository.save(nominee);
    }

    private void validateRecruitmentForm(RecruitmentFormRequest recruitmentFormRequest) {
        isRecruitmentTimeValid(recruitmentFormRequest.getRecruitmentDetails(), recruitmentFormRequest.getAdvertisingForm());
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

    private void isRecruitmentTimeValid(RecruitmentDetails recruitmentDetails, AdvertisingForm advertisingForm) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime recruitmentDeadline = recruitmentDetails.getRecruitmentInformation().getDeadline();
        if (recruitmentDeadline.isBefore(now) || recruitmentDeadline.isBefore(advertisingForm.getRecruitmentTime())) {
            throw new InvalidRequestException("Recruitment time is invalid");
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
