package org.spring.loginregistration.controller;

import org.spring.loginregistration.model.DoctorProfile;
import org.spring.loginregistration.service.DoctorProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor/profile")
public class DoctorProfileController {

    private final DoctorProfileService doctorProfileService;

    public DoctorProfileController(DoctorProfileService doctorProfileService) {
        this.doctorProfileService = doctorProfileService;
    }

    @PostMapping
    public ResponseEntity<DoctorProfile> saveProfile(Authentication authentication, @RequestBody DoctorProfile profile) {
        Long doctorId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(doctorProfileService.saveOrUpdateProfile(doctorId, profile));
    }

    @GetMapping
    public ResponseEntity<DoctorProfile> getProfile(Authentication authentication) {
        Long doctorId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(doctorProfileService.getProfile(doctorId));
    }
}
