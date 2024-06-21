package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnterpriseService {
    private final EnterpriseRepository enterpriseRepository;

    public EnterpriseService(EnterpriseRepository enterpriseRepository) {
        this.enterpriseRepository = enterpriseRepository;
    }

    public Page<Enterprise> getAllEnterprises(Pageable pageable) {
        return enterpriseRepository.findAll(pageable);
    }

    public Enterprise getEnterpriseById(String id) {
        Optional<Enterprise> optionalEnterprise = enterpriseRepository.findByEnterpriseId(id);

        if (optionalEnterprise.isPresent()) {
            return optionalEnterprise.get();
        } else {
            if (enterpriseRepository.findByMemberId(id) != null) {
                return enterpriseRepository.findByMemberId(id);
            }
            throw new ResourceNotFoundException("Enterprise not found with id: " + id);
        }
    }

    public Page<Enterprise> searchEnterprises(String value, Pageable pageable) {
        return enterpriseRepository.findAll(new MemberSpecification<>(value, Enterprise.class), pageable);
    }
}
