package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.service.NomineeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nominees")
public class NomineeController {
    private final NomineeService nomineeService;

    public NomineeController(NomineeService nomineeService) {
        this.nomineeService = nomineeService;
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllNominees() {
        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).data(nomineeService.getAllNominees()).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getNomineeById(@PathVariable int id) {
        Nominee nominee = nomineeService.getNomineeById(id);
        if (nominee == null) {
            return ResponseEntity.ok(ResponseObject.builder().statusCode(404).message("Nominee not found").build());
        }
        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).data(nominee).build());
    }

}
