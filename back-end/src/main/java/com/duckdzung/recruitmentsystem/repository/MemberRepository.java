package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Member;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);
    Optional<Member> findFirstByIdStartsWithOrderByIdDesc(String prefix);

    Page<Member> findByRole(Role role, Pageable pageable);

    Page<Member> findAll(Specification<Member> spec, Pageable pageable);
}
