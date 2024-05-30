package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.Profile;
import com.duckdzung.recruitmentsystem.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllProfiles(Pageable pageable) {
        Page<Profile> profiles = profileService.getAllProfiles(pageable);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Success")
                        .data(profiles)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getProfileById(@PathVariable("id") int id) {
        Profile profile = profileService.getProfileById(id);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Success")
                        .data(profile)
                        .build()
        );
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<Resource> getProfilePdf(@PathVariable("id") int id) {
        Resource file = profileService.loadFileAsResource(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createProfile(@RequestBody Profile profile) {
        Profile createdProfile = profileService.createProfile(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseObject.builder()
                        .statusCode(HttpStatus.CREATED.value())
                        .message("Profile created successfully")
                        .data(createdProfile)
                        .build()
        );
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<ResponseObject> uploadProfilePdf(@PathVariable("id") int id, @RequestParam("file") MultipartFile file) {
        profileService.storeFile(id, file);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("File uploaded successfully")
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateProfile(@PathVariable("id") int id, @RequestBody Profile profile) {
        Profile updatedProfile = profileService.updateProfile(id, profile);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Profile updated successfully")
                        .data(updatedProfile)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteProfile(@PathVariable("id") int id) {
        profileService.deleteProfile(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                ResponseObject.builder()
                        .statusCode(HttpStatus.NO_CONTENT.value())
                        .message("Profile deleted successfully")
                        .data(null)
                        .build()
        );
    }
}
