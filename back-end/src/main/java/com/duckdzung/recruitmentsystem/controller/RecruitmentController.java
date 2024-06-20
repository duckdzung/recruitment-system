package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.RecruitmentFormRequest;
import com.duckdzung.recruitmentsystem.common.RecruitmentFormResponse;
import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/recruitments")
public class RecruitmentController {
    @Autowired
    private RecruitmentService recruitmentService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PagedResourcesAssembler<RecruitmentFormResponse> pagedResourcesAssembler;


    @PostMapping
    public ResponseEntity<ResponseObject> createRecruitment(@RequestHeader("Authorization") String authorization, @RequestBody RecruitmentFormRequest recruitmentFormRequest) {
        String memberId = jwtService.extractUserIdFromToken(authorization);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(201)
                        .message("Recruitment created successfully")
                        .data(recruitmentService.createRecruitmentInformation(memberId, recruitmentFormRequest))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllRecruitments(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Page<RecruitmentFormResponse> recruitmentForms = recruitmentService.getAllRecruitments(PageRequest.of(page, size));
        PagedModel<EntityModel<RecruitmentFormResponse>> pagedModel = pagedResourcesAssembler.toModel(recruitmentForms);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Recruitment forms retrieved successfully")
                        .data(pagedModel)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getRecruitmentById(@PathVariable int id) {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Recruitment form retrieved successfully")
                        .data(recruitmentService.getRecruitmentInformationById(id))
                        .build()
        );
    }

    @GetMapping("/nominee")
    public ResponseEntity<ResponseObject> getRecruitmentsByNominee(@RequestParam String position, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Page<RecruitmentFormResponse> recruitmentForms = recruitmentService.getRecruitmentsByNominee(position, PageRequest.of(page, size));
        PagedModel<EntityModel<RecruitmentFormResponse>> pagedModel = pagedResourcesAssembler.toModel(recruitmentForms);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Recruitment forms retrieved successfully")
                        .data(pagedModel)
                        .build()
        );
    }

    @GetMapping("/enterprise")
    public ResponseEntity<ResponseObject> getRecruitmentsByEnterpriseAddress(@RequestParam String address, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Page<RecruitmentFormResponse> recruitmentForms = recruitmentService.getRecruitmentsByEnterpriseAddress(address, PageRequest.of(page, size));
        PagedModel<EntityModel<RecruitmentFormResponse>> pagedModel = pagedResourcesAssembler.toModel(recruitmentForms);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Recruitment forms retrieved successfully")
                        .data(pagedModel)
                        .build()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> getRecruitmentsByNomineeAndAddress(@RequestParam String position, @RequestParam String address, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Page<RecruitmentFormResponse> recruitmentForms = recruitmentService.getRecruitmentsByNomineeAndAddress(position, address, PageRequest.of(page, size));
        PagedModel<EntityModel<RecruitmentFormResponse>> pagedModel = pagedResourcesAssembler.toModel(recruitmentForms);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Recruitment forms retrieved successfully")
                        .data(pagedModel)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteRecruitment(@PathVariable int id) {
        recruitmentService.deleteRecruitmentInformation(id);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Recruitment form deleted successfully")
                        .data(null)
                        .build()
        );
    }
}
