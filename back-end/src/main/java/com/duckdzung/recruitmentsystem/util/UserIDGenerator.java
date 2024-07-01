package com.duckdzung.recruitmentsystem.util;

import com.duckdzung.recruitmentsystem.model.Candidate;
import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.Member;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.duckdzung.recruitmentsystem.repository.CandidateRepository;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import com.duckdzung.recruitmentsystem.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class UserIDGenerator {


    private static CandidateRepository candidateRepository;
    private static EnterpriseRepository enterpriseRepository;
    private static MemberRepository memberRepository;

    @Autowired
    public UserIDGenerator(
            CandidateRepository candidateRepo,
            EnterpriseRepository enterpriseRepo,
            MemberRepository memberRepo) {
        candidateRepository = candidateRepo;
        enterpriseRepository = enterpriseRepo;
        memberRepository = memberRepo;
    }


    public static String generateUserID(Role role) {
        String prefix;
        Optional<String> latestIdOpt = switch (role) {
            case CANDIDATE -> {
                prefix = "CA";
                yield candidateRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Candidate::getId);
            }
            case ENTERPRISE -> {
                prefix = "EN";
                yield enterpriseRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Enterprise::getId);
            }
            case PRESIDENT, STAFF, MEMBER -> {
                if (role == Role.PRESIDENT) {
                    prefix = "PR";
                } else if (role == Role.STAFF) {
                    prefix = "ST";
                } else {
                    prefix = "ME";
                }
                yield memberRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Member::getId);
            }
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        };

        return prefix + String.format("%03d", latestIdOpt.map(id -> Integer.parseInt(id.substring(2)) + 1).orElse(1));
    }
}
