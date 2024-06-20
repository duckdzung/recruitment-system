package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentInformationRepository extends JpaRepository<RecruitmentInformation, Integer> {
    Page<RecruitmentInformation> findByEnterprise_Member_Address(String address, Pageable pageable);
}
