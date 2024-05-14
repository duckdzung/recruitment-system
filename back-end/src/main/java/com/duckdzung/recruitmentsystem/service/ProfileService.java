package com.duckdzung.recruitmentsystem.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Profile;
import com.duckdzung.recruitmentsystem.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    private static final String FILE_DIRECTORY = "uploads";

    public Page<Profile> getAllProfiles(Pageable pageable) {
        return profileRepository.findAll(pageable);
    }

    public Profile getProfileById(int id) {
        return profileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Profile with ID " + id + " not found.")
        );
    }

    public Profile createProfile(Profile profile) {
        profile.setValidate(false);
        profile.setDateOfReceipt(LocalDateTime.now());
        return profileRepository.save(profile);
    }

    public void storeFile(int id, MultipartFile file) {
        Profile profile = profileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Profile with ID " + id + " not found.")
        );

        String fileName = "profile_" + id + ".pdf";
        Path filePath = Paths.get(FILE_DIRECTORY, fileName);

        try {
            // Create directories if they do not exist
            if (Files.notExists(filePath.getParent())) {
                Files.createDirectories(filePath.getParent());
            }

            // Write file to directory
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Update filePath of this profile
        profile.setFilePath(filePath.toString());
        updateProfile(id, profile);
    }

    public Resource loadFileAsResource(int id) {
        Profile profile = getProfileById(id);
        if (profile == null || profile.getFilePath() == null) {
            throw new ResourceNotFoundException("Profile or file not found with id " + id);
        }

        try {
            Path filePath = Paths.get(profile.getFilePath());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found or not readable with id " + id);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }


    public Profile updateProfile(int id, Profile profile) {
        if (!profileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Profile with ID " + id + " not found.");
        }
        profile.setProfileId(id);
        return profileRepository.save(profile);
    }

    public void deleteProfile(int id) {
        if (!profileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Profile with ID " + id + " not found.");
        }
        profileRepository.deleteById(id);
    }
}
