package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Profile;
import com.duckdzung.recruitmentsystem.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    public Page<Profile> getAllProfiles(Pageable pageable) {
        return profileRepository.findAll(pageable);
    }

    public Profile getProfileById(int id) {
        return profileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Profile with ID " + id + " not found.")
        );
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
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
