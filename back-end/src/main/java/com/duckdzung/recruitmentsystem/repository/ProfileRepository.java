package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    List<Profile> findByCandidateId(String candidateId);

    Profile findByCandidateIdAndFileName(String candidateId, String fileName);
}
