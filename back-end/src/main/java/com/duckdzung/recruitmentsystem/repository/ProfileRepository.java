package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Page<Profile> findByCandidateId(String candidateId, Pageable pageable);
    Profile findByCandidateIdAndFileName(String candidateId, String fileName);
}
