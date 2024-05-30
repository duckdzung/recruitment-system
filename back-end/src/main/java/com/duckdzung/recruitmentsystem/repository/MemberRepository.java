package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);
    Optional<Member> findFirstByIdStartsWithOrderByIdDesc(String prefix);

}
