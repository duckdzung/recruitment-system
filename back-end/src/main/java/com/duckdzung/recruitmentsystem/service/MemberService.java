package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.Member;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import com.duckdzung.recruitmentsystem.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final EnterpriseRepository enterpriseRepository;

    public MemberService(MemberRepository memberRepository, EnterpriseRepository enterpriseRepository) {
        this.memberRepository = memberRepository;
        this.enterpriseRepository = enterpriseRepository;
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

    public Page<Member> searchMembers(String value, Pageable pageable) {
        Specification<Member> spec = new MemberSpecification<>(value, Member.class);
        return memberRepository.findAll(spec, pageable);
    }

    @Transactional
    public void deleteMember(String id) {
        Enterprise enterprise = enterpriseRepository.findByMemberId(id);
        if (enterprise != null) {
            enterpriseRepository.delete(enterprise);
        }
        memberRepository.deleteById(id);
    }
}
