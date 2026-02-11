package org.spring.loginregistration.controller;

import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.DoctorProfile;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.model.UserProfile;
import org.spring.loginregistration.repository.DoctorProfileRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.spring.loginregistration.service.UserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user/profile")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserRepository userRepository;
    private final DoctorProfileRepository doctorProfileRepository;

    public UserProfileController(UserProfileService userProfileService, UserRepository userRepository, DoctorProfileRepository doctorProfileRepository) {
        this.userProfileService = userProfileService;
        this.userRepository = userRepository;
        this.doctorProfileRepository = doctorProfileRepository;
    }

    @PostMapping
    public ResponseEntity<UserProfile> saveProfile(Authentication authentication, @RequestBody UserProfile userProfile) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(userProfileService.saveOrUpdateProfile(userId, userProfile));
    }

    @GetMapping
    public ResponseEntity<UserProfile> getProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(userProfileService.getProfile(userId));
    }

    @GetMapping("/my-doctor")
    public ResponseEntity<DoctorProfile> getMyDoctorProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = user.getDoctor();
        if (doctor == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No doctor assigned yet.");
        }

        return ResponseEntity.ok(doctorProfileRepository.findById(doctor.getDoctorId())
                .orElseGet(() -> {
                    DoctorProfile basicProfile = new DoctorProfile();
                    basicProfile.setFullName(doctor.getUserName());
                    basicProfile.setMobileNumber(doctor.getEmail());
                    basicProfile.setSpecialization("General Physician");
                    basicProfile.setDegreeName("MBBS");
                    return basicProfile;
                }));
    }
}
