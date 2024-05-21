package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentInformationRepository extends JpaRepository<RecruitmentInformation, Integer> {
}
