package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.ProfileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;
    private final JwtService jwtService;

    public ProfileController(ProfileService profileService, JwtService jwtService) {
        this.profileService = profileService;
        this.jwtService = jwtService;
    }

    @PostMapping(path = "", consumes = "multipart/form-data")
    public ResponseEntity<ResponseObject> createProfile(
            @RequestHeader("Authorization") String authorization,
            @RequestBody MultipartFile file
    ) {
        String memberId = jwtService.extractUserIdFromToken(authorization);
        profileService.createProfile(memberId, file);
        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .statusCode(201)
                        .message("Upload file successfully")
                        .build()
                );
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable int id) {
        Resource resource = profileService.getFileAsResource(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getProfileById(@PathVariable int id) {
        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .statusCode(200)
                        .message("File detail retrieved successfully")
                        .data(profileService.getProfileById(id))
                        .build()
                );
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<ResponseObject> getProfilesByCandidateId(@PathVariable String candidateId) {
        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .statusCode(200)
                        .message("File details retrieved successfully")
                        .data(profileService.getProfilesByCandidateId(candidateId))
                        .build()
                );
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllProfiles() {
        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .statusCode(200)
                        .message("File details retrieved successfully")
                        .data(profileService.getAllProfiles())
                        .build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteProfile(@PathVariable int id) {
        profileService.deleteProfile(id);
        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .statusCode(200)
                        .message("File detail deleted successfully")
                        .build()
                );
    }

    @PatchMapping("/approve/{id}")
    public ResponseEntity<ResponseObject> approveRequest(@RequestHeader("Authorization") String authorization, @PathVariable int id) {
        String staffId = jwtService.extractUserIdFromToken(authorization);
        profileService.approveRequest(staffId, id);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Request approved")
                        .build()
        );
    }

    @PatchMapping("/reject/{id}")
    public ResponseEntity<ResponseObject> rejectRequest(@RequestHeader("Authorization") String authorization, @PathVariable int id) {
        String staffId = jwtService.extractUserIdFromToken(authorization);
        profileService.rejectRequest(staffId, id);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Request rejected")
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateFileDetail(@PathVariable int id, @RequestBody MultipartFile file) {
        profileService.updateProfile(id, file);
        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .statusCode(200)
                        .message("File detail updated successfully")
                        .build()
                );
    }
}
