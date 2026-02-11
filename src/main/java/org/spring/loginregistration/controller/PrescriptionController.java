package org.spring.loginregistration.controller;

import org.spring.loginregistration.dto.PrescriptionRequest;
import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.service.PrescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
            @RequestBody PrescriptionRequest request) {
        
        Long doctorId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(prescriptionService.savePrescription(
                doctorId, 
                request.getUserId(), 
                request.getMedicines(), 
                request.getDiagnosis(), 
                request.getNote(), 
                request.getNextAppointmentDate()
        ));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Prescription>> getMyPrescriptions(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(prescriptionService.getPrescriptionsForPatient(userId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsForPatient(patientId));
    }
}
