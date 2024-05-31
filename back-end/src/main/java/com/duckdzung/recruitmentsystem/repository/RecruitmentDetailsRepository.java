package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.model.RecruitmentDetails;
import com.duckdzung.recruitmentsystem.model.idClass.RecruitmentDetailsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentDetailsRepository extends JpaRepository<RecruitmentDetails, RecruitmentDetailsKey> {
    @Query("SELECT rd FROM RecruitmentDetails rd WHERE rd.nominee = ?1 AND rd.recruitmentInformation.enterprise.id = ?2")
    List<RecruitmentDetails> findByNomineeAndMemberId(Nominee nomineeId, String memberId);

}
