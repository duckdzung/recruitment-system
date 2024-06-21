package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/enterprises")
public class EnterpriseController {

    @Autowired
    private EnterpriseService enterpriseService;

    @GetMapping("/addresses")
    public List<String> getAllEnterpriseAddresses() {
        List<Enterprise> enterprises = enterpriseService.getAllEnterprises();
        return enterprises.stream()
                .map(enterprise -> enterprise.getMember().getAddress())
                .collect(Collectors.toList());
    }
}