package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnterpriseService {
    private final EnterpriseRepository enterpriseRepository;

    public EnterpriseService(EnterpriseRepository enterpriseRepository) {
        this.enterpriseRepository = enterpriseRepository;
    }

    public List<Enterprise> getAllEnterprises() {
        return enterpriseRepository.findAll();
    }
}
