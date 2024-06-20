package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.model.RecruitmentDetails;
import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import com.duckdzung.recruitmentsystem.model.idClass.RecruitmentDetailsKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentDetailsRepository extends JpaRepository<RecruitmentDetails, RecruitmentDetailsKey> {
    @Query("SELECT rd FROM RecruitmentDetails rd WHERE rd.nominee = ?1 AND rd.recruitmentInformation.enterprise.id = ?2")
    List<RecruitmentDetails> findByNomineeAndMemberId(Nominee nomineeId, String memberId);

    RecruitmentDetails findByRecruitmentInformation(RecruitmentInformation recruitmentInformation);


    Page<RecruitmentDetails> findByNominee_Position(String position, Pageable pageable);


    @Query("SELECT r FROM RecruitmentDetails r WHERE " +
            "LOWER(r.nominee.position) LIKE LOWER(CONCAT('%', :position, '%')) AND " +
            "LOWER(r.recruitmentInformation.enterprise.member.address) LIKE LOWER(CONCAT('%', :address, '%'))")
    Page<RecruitmentDetails> findByNominee_PositionAndRecruitmentInformation_Enterprise_Member_Address_Fuzzy(
            @Param("position") String position,
            @Param("address") String address,
            Pageable pageable);
}

