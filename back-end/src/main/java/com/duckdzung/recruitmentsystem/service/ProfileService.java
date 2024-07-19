package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.exception.InternalServerErrorException;
import com.duckdzung.recruitmentsystem.exception.InvalidRequestException;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Candidate;
import com.duckdzung.recruitmentsystem.model.Profile;
import com.duckdzung.recruitmentsystem.repository.CandidateRepository;
import com.duckdzung.recruitmentsystem.repository.ProfileRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final CandidateRepository candidateRepository;

    public ProfileService(ProfileRepository profileRepository, CandidateRepository candidateRepository) {
        this.profileRepository = profileRepository;
        this.candidateRepository = candidateRepository;
    }

    public int createProfile(String memberId, MultipartFile file) {
        if (file == null || memberId == null) {
            throw new InvalidRequestException("File and memberId cannot be null");
        }

        Candidate candidate = candidateRepository.findByMemberId(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("No candidate found with the provided memberId"));

        String filePath = storeFile(file);

        Profile profile = profileRepository.findByCandidateIdAndFileName(candidate.getId(), file.getOriginalFilename());

        if (profile != null) {
            // If a FileDetail already exists, update the filePath
            profile.setFilePath(filePath);
        } else {
            // If no FileDetail exists, create a new one
            profile = Profile.builder()
                    .filePath(filePath)
                    .fileName(file.getOriginalFilename())
                    .candidate(candidate)
                    .build();
        }

        profile = profileRepository.save(profile);

        return profile.getId();
    }

    private String storeFile(MultipartFile file) {
        try {
            long maxFileSize = 1024 * 1024 * 5; // 5 MB

            if (file.getSize() > maxFileSize) {
                throw new InvalidRequestException("File size exceeds the maximum limit of 5MB");
            }

            // Define the target location for the file
            Path targetLocation = Paths.get("src/main/resources/profiles/" + file.getOriginalFilename());

            Files.createDirectories(targetLocation.getParent());

            // Copy the file to the target location, replacing the existing file if it exists
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Return the file path
            return targetLocation.toString();
        } catch (IOException e) {
            throw new InternalServerErrorException("Failed to store file " + file.getOriginalFilename() + e.getMessage());
        }
    }

    public void deleteProfile(int fileDetailId) {
        Profile profile = profileRepository.findById(fileDetailId)
                .orElseThrow(() -> new ResourceNotFoundException("No file detail found with the provided fileDetailId"));

        deleteFile(profile.getFilePath());
        profileRepository.delete(profile);
    }

    private void deleteFile(String filePath) {
        try {
            Files.deleteIfExists(Paths.get(filePath));
        } catch (IOException e) {
            throw new InternalServerErrorException("Failed to delete file " + filePath + e.getMessage());
        }
    }

    public Profile getProfileById(Integer profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("No file detail found with the provided profileId"));
    }

    public Page<Profile> getProfilesByCandidateId(String candidateId, PageRequest pageRequest) {
        return profileRepository.findByCandidateId(candidateId, pageRequest);
    }

    public Page<Profile> getAllProfiles(PageRequest pageRequest) {
        return profileRepository.findAll(pageRequest);
    }

    public Resource getFileAsResource(Integer profileId) {
        Profile profile = getProfileById(profileId);
        Path filePath = Paths.get(profile.getFilePath());
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
        } catch (MalformedURLException e) {
            throw new InternalServerErrorException("Failed to load file as resource " + e.getMessage());
        }
        return resource;
    }

    public void approveRequest(String staffId, int profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("No file detail found with the provided profileId"));

        profile.setValidate(true);
        profile.setValidatedBy(staffId);
        profileRepository.save(profile);
    }

    public void rejectRequest(String staffId, int profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("No file detail found with the provided profileId"));

        profile.setValidate(false);
        profile.setValidatedBy(staffId);
        profileRepository.save(profile);
    }

    public void updateProfile(int id, MultipartFile file) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No file detail found with the provided profileId"));

        if (Duration.between(profile.getDateOfReceipt(), LocalDateTime.now()).toDays() > 3) {
            throw new InvalidRequestException("Profile can only be updated within 3 days of creation");
        }

        deleteFile(profile.getFilePath());
        String filePath = storeFile(file);

        profile.setFilePath(filePath);
        profile.setFileName(file.getOriginalFilename());

        profileRepository.save(profile);
    }
}
