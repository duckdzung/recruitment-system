package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.ApplicationRequest;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.ApplicationForm;
import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.model.Profile;
import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import com.duckdzung.recruitmentsystem.repository.ApplicationFormRepository;
import com.duckdzung.recruitmentsystem.repository.NomineeRepository;
import com.duckdzung.recruitmentsystem.repository.RecruitmentInformationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ApplicationFormService {
    private final ApplicationFormRepository applicationFormRepository;

    private final RecruitmentInformationRepository recruitmentInformationRepository;

    private final NomineeRepository nomineeRepository;

    private final ProfileService profileService;

    public ApplicationFormService(ApplicationFormRepository applicationFormRepository, RecruitmentInformationRepository recruitmentInformationRepository, NomineeRepository nomineeRepository, ProfileService profileService) {
        this.applicationFormRepository = applicationFormRepository;
        this.recruitmentInformationRepository = recruitmentInformationRepository;
        this.nomineeRepository = nomineeRepository;
        this.profileService = profileService;
    }

    public ApplicationForm createApplicationForm(ApplicationRequest applicationRequest) {
        Nominee nominee = nomineeRepository.findById(applicationRequest.getNomineeId())
                .orElseThrow(() -> new ResourceNotFoundException("No nominee found with the provided nomineeId"));

        RecruitmentInformation recruitmentInformation = recruitmentInformationRepository.findById(applicationRequest.getRecruitId())
                .orElseThrow(() -> new ResourceNotFoundException("No recruitment information found with the provided recruitId"));

        Profile profile = profileService.getProfileById(applicationRequest.getProfileId());

        ApplicationForm applicationForm = ApplicationForm.builder()
                .nominee(nominee)
                .recruitmentInformation(recruitmentInformation)
                .profile(profile)
                .build();

        return applicationFormRepository.save(applicationForm);
    }

    public void processApplicationForm(String staffId, ApplicationRequest applicationRequest) {
        ApplicationForm applicationForm = applicationFormRepository.findByRecruitmentInformation_RecruitIdAndNominee_NomineeIdAndProfileId(
                applicationRequest.getRecruitId(),
                applicationRequest.getNomineeId(),
                applicationRequest.getProfileId()
        );

        if (applicationForm == null) {
            throw new ResourceNotFoundException("No application form found with the provided nomineeId, recruitId, and profileId");
        }

        applicationForm.setIsProcessed(true);
        applicationForm.setProcessedBy(staffId);
        applicationFormRepository.save(applicationForm);
    }


    public void deleteApplicationForm(int recruitId, int nomineeId, int profileId) {
        ApplicationForm applicationForm = applicationFormRepository.findByRecruitmentInformation_RecruitIdAndNominee_NomineeIdAndProfileId(
                recruitId,
                nomineeId,
                profileId
        );

        if (applicationForm == null) {
            throw new ResourceNotFoundException("No application form found with the provided nomineeId, recruitId, and profileId");
        }

        applicationFormRepository.delete(applicationForm);
    }

    public ApplicationForm getApplicationForm(int recruitId, int nomineeId, int profileId) {
        ApplicationForm applicationForm = applicationFormRepository.findByRecruitmentInformation_RecruitIdAndNominee_NomineeIdAndProfileId(
                recruitId,
                nomineeId,
                profileId
        );

        if (applicationForm == null) {
            throw new ResourceNotFoundException("No application form found with the provided nomineeId, recruitId, and profileId");
        }

        return applicationForm;
    }

    public Page<ApplicationForm> getAllApplicationForms(Pageable pageable) {
        return applicationFormRepository.findAll(pageable);

    }
}
