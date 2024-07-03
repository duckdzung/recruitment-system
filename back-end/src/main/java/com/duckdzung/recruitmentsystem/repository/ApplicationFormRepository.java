package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.ApplicationForm;
import com.duckdzung.recruitmentsystem.model.idClass.ApplicationFormKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, ApplicationFormKey> {
    ApplicationForm findByRecruitmentInformation_RecruitIdAndNominee_NomineeIdAndProfileId(int recruitId, int nomineeId, int profileId);
}
