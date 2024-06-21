package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/enterprises")
public class EnterpriseController {

    @Autowired
    private EnterpriseService enterpriseService;

    @Autowired
    private PagedResourcesAssembler<Enterprise> pagedResourcesAssembler;

    @GetMapping("/addresses")
    public ResponseEntity<ResponseObject> getAllEnterpriseAddresses() {
        List<Enterprise> enterprises = enterpriseService.getAllEnterprises(Pageable.unpaged()).getContent();
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Enterprise addresses retrieved successfully")
                        .data(enterprises.stream().map(enterprise -> enterprise.getMember().getAddress()).collect(Collectors.toSet()))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllEnterprises(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Enterprise> enterprises = enterpriseService.getAllEnterprises(Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Enterprises retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(enterprises))
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getEnterpriseById(@PathVariable String id) {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Enterprise retrieved successfully")
                        .data(enterpriseService.getEnterpriseById(id))
                        .build()
        );
    }
}