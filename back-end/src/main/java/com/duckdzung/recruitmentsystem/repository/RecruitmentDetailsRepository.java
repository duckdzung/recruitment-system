package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.RecruitmentDetails;
import com.duckdzung.recruitmentsystem.model.idClass.RecruitmentDetailsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentDetailsRepository extends JpaRepository<RecruitmentDetails, RecruitmentDetailsKey> {
}
