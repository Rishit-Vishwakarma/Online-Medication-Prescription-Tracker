package org.spring.loginregistration.controller;

import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.service.PrescriptionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/write")
    public ResponseEntity<Prescription> writePrescription(
            Authentication authentication,
            @RequestParam Long patientId,
            @RequestParam List<String> medicines,
            @RequestParam String diagnoses,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate nextDate) {
        
        Long doctorId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(prescriptionService.savePrescription(doctorId, patientId, medicines, diagnoses, note, nextDate));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsForPatient(patientId));
    }
}
