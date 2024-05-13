package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Profile;
import com.duckdzung.recruitmentsystem.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getProfileById(@PathVariable("id") int id) {
        Profile profile = profileService.getProfileById(id);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Success")
                .data(profile)
                .build(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createProfile(@RequestBody Profile profile) {
        Profile createdProfile = profileService.createProfile(profile);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Profile created successfully")
                .data(createdProfile)
                .build(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateProfile(@PathVariable("id") int id, @RequestBody Profile profile) {
        Profile updatedProfile = profileService.updateProfile(id, profile);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Profile updated successfully")
                .data(updatedProfile)
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteProfile(@PathVariable("id") int id) {
        profileService.deleteProfile(id);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(HttpStatus.NO_CONTENT.value())
                .message("Profile deleted successfully")
                .data(null)
                .build(), HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllProfiles(Pageable pageable) {
        Page<Profile> profiles = profileService.getAllProfiles(pageable);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Success")
                .data(profiles)
                .build());
    }
}
