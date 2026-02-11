package org.spring.loginregistration.service;

import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.DoctorProfile;
import org.spring.loginregistration.repository.DoctorProfileRepository;
import org.spring.loginregistration.repository.DoctorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DoctorProfileService {
    private final DoctorProfileRepository doctorProfileRepository;
    private final DoctorRepository doctorRepository;

    public DoctorProfileService(DoctorProfileRepository doctorProfileRepository, DoctorRepository doctorRepository){
        this.doctorProfileRepository = doctorProfileRepository;
        this.doctorRepository = doctorRepository;
    }

    public DoctorProfile saveOrUpdateProfile(Long doctorId, DoctorProfile newProfile){
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found"));

        DoctorProfile existingProfile = doctorProfileRepository.findById(doctorId)
                .orElse(new DoctorProfile());

        existingProfile.setId(doctorId);
        existingProfile.setDoctor(doctor);
        existingProfile.setFullName(newProfile.getFullName());
        existingProfile.setMobileNumber(newProfile.getMobileNumber());
        existingProfile.setDegreeName(newProfile.getDegreeName());
        existingProfile.setSpecialization(newProfile.getSpecialization());
        existingProfile.setExperienceYears(newProfile.getExperienceYears());
        existingProfile.setClinicAddress(newProfile.getClinicAddress());
        existingProfile.setBio(newProfile.getBio());
        existingProfile.setProfilePhotoUrl(newProfile.getProfilePhotoUrl());
        existingProfile.setDegreePhotoUrl(newProfile.getDegreePhotoUrl());

        return doctorProfileRepository.save(existingProfile);
    }

    public DoctorProfile getProfile(Long doctorId){
        // Try to find the profile
        return doctorProfileRepository.findById(doctorId)
                .orElseGet(() -> {
                    Doctor doctor = doctorRepository.findById(doctorId)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor account not found"));
                    
                    DoctorProfile tempProfile = new DoctorProfile();
                    tempProfile.setFullName(doctor.getUserName()); // Pre-fill name
                    tempProfile.setMobileNumber(""); // Empty default
                    return tempProfile;
                });
    }
}
