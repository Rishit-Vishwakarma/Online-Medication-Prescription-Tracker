package org.spring.loginregistration.controller;

import org.spring.loginregistration.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class DoctorController {

    private final DoctorService doctorService;
    public DoctorController(DoctorService doctorService){
        this.doctorService = doctorService;
    }

    @PostMapping("/doctor")
    public ResponseEntity<String> setDoctorInfo(@RequestParam String doctorName,@RequestParam String degree, @RequestParam String specialization, @RequestParam String phoneNumber){

        doctorService.setDoctorInfo(doctorName, degree, specialization, phoneNumber);
        return ResponseEntity.ok("Doctor Info saved successfully. ");
    }

    @PutMapping("doctor/prescription")
    public ResponseEntity<String> editPriscription(@RequestParam Long userId, @RequestParam List<String> medicines, @RequestParam String diagnoses, @RequestParam Date nextAppointmentDate){
        doctorService.setPrescription( userId, medicines, diagnoses, nextAppointmentDate);
        return ResponseEntity.ok("Prescription updated successfully");
    }
}