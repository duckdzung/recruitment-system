package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ProfileRepository extends JpaRepository<Profile, Integer> {
}
