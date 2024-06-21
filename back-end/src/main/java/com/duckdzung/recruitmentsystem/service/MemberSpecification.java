package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.Member;
import jakarta.persistence.criteria.*;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class MemberSpecification<T> implements Specification<T> {

    private final String value;

    public MemberSpecification(String value, Class<T> type) {
        this.value = value;

        if (!(Member.class.equals(type) || Enterprise.class.equals(type))) {
            throw new IllegalArgumentException("Type must be either Member or Enterprise");
        }
    }

    @Override
    public Predicate toPredicate(@NonNull Root<T> root, @NonNull CriteriaQuery<?> query, @NonNull CriteriaBuilder criteriaBuilder) {
        if (value == null) {
            return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
        }

        List<Predicate> predicates = new ArrayList<>();

        if (Member.class.isAssignableFrom(root.getJavaType())) {
            // Add predicates for Member properties
            List<String> memberProperties = Arrays.asList("id", "name", "address", "email", "phoneNumber", "role");
            for (String property : memberProperties) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(property)),
                        "%" + value.toLowerCase() + "%"
                ));
            }
        } else if (Enterprise.class.isAssignableFrom(root.getJavaType())) {
            // Add predicates for Enterprise properties
            predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("taxCode")),
                    "%" + value.toLowerCase() + "%"
            ));
            predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("companyName")),
                    "%" + value.toLowerCase() + "%"
            ));

            // Join with Member and add predicates for Member properties
            Join<Enterprise, Member> memberJoin = root.join("member");
            List<String> memberProperties = Arrays.asList("id", "name", "address", "email", "phoneNumber", "role");
            for (String property : memberProperties) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(memberJoin.get(property)),
                        "%" + value.toLowerCase() + "%"
                ));
            }
        }

        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }
}
