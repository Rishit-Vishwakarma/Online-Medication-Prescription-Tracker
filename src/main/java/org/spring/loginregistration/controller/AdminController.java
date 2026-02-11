package org.spring.loginregistration.controller;

import org.spring.loginregistration.dto.DoctorDTO;
import org.spring.loginregistration.dto.UserDTO;
import org.spring.loginregistration.model.Appointment;
import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Map<String, String> request){
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        adminService.register(username, email, password);
        return ResponseEntity.ok("Admin Register Successfully.");
    }

    @PostMapping("/admin/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String password = request.get("password");
        String msg = adminService.login(email, password);
        return ResponseEntity.ok("Admin Login successfully. Token: " + msg);
    }

    @PostMapping("/admin/assignDoctorToUser")
    public ResponseEntity<String> assignDoctor(Authentication authentication, @RequestBody Map<String, Long> request){
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or missing token");
        }
        Long userId = request.get("userId");
        Long doctorId = request.get("doctorId");
        adminService.assignDoctorToUser(userId, doctorId);
        return ResponseEntity.ok("Doctor assigned successfully.");
    }

    @GetMapping("/admin/all-users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/admin/all-doctors")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        return ResponseEntity.ok(adminService.getAllDoctors());
    }

    @DeleteMapping("/admin/remove-doctor/{userId}")
    public ResponseEntity<String> removeDoctor(@PathVariable Long userId) {
        adminService.removeDoctorFromUser(userId);
        return ResponseEntity.ok("Doctor removed successfully.");
    }

    @GetMapping("/admin/doctors-with-patients")
    public ResponseEntity<List<Doctor>> getDoctorsWithPatients() {
        return ResponseEntity.ok(adminService.getDoctorsWithPatients());
    }

    @GetMapping("/admin/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(adminService.getAllAppointments());
    }

    @GetMapping("/admin/analytics")
    public ResponseEntity<Map<String, Long>> getAnalytics() {
        return ResponseEntity.ok(adminService.getAnalytics());
    }
}
