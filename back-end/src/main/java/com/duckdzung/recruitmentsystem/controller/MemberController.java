package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.AuthRequest;
import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.Member;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.AuthService;
import com.duckdzung.recruitmentsystem.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/members")
public class MemberController {
    @Autowired
    private AuthService authService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PagedResourcesAssembler<Member> pagedResourcesAssembler;
    @PostMapping
    public ResponseEntity<ResponseObject> update(@RequestHeader("Authorization") String authorization, @RequestBody AuthRequest updateRequest) {
        String id = jwtService.extractUserIdFromToken(authorization);
        String updateResult = authService.upgradeMember(id, updateRequest);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message(updateResult)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ResponseObject> approve(@PathVariable String id) {
        authService.approveMemberUpgrade(id);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Enterprise approved successfully")
                .data(null)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ResponseObject> reject(@PathVariable String id) {
        authService.rejectMemberUpgrade(id);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Enterprise rejected successfully")
                .data(null)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getMemberById(@PathVariable String id) {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Member retrieved successfully")
                        .data(memberService.getMemberById(id))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllMembers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Member> members = memberService.getAllMembers(Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Members retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(members))
                        .build()
        );
    }

    @GetMapping("/candidates")
    public ResponseEntity<ResponseObject> getAllCandidates(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Member> candidates = memberService.getAllCandidates(Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Candidates retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(candidates))
                        .build()
        );
    }

    @GetMapping("/staffs")
    public ResponseEntity<ResponseObject> getAllStaffs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Member> staffs = memberService.getAllStaffs(Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Staffs retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(staffs))
                        .build()
        );
    }

    @GetMapping("/presidents")
    public ResponseEntity<ResponseObject> getAllPresidents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Member> presidents = memberService.getAllPresidents(Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Presidents retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(presidents))
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateMember(@PathVariable String id, @RequestBody AuthRequest updateRequest) {
        String updateResult = authService.updateMember(id, updateRequest);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message(updateResult)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchMembers(@RequestParam String value, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Member> members = memberService.searchMembers(value, Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Members retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(members))
                        .build()
        );
    }
}
