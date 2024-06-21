package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.model.Member;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.duckdzung.recruitmentsystem.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Page<Member> getAllMembers(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    public Page<Member> getAllCandidates(Pageable pageable) {
        return memberRepository.findByRole(Role.CANDIDATE, pageable);
    }

    public Page<Member> getAllStaffs(Pageable pageable) {
        return memberRepository.findByRole(Role.STAFF, pageable);
    }

    public Page<Member> getAllPresidents(Pageable pageable) {
        return memberRepository.findByRole(Role.PRESIDENT, pageable);
    }

    public Member getMemberById(String id) {
        return memberRepository.findById(id).orElse(null);
    }
}
