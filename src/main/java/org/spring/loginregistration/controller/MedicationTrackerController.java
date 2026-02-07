package org.spring.loginregistration.controller;

import org.spring.loginregistration.model.MedicationTracker;
import org.spring.loginregistration.service.MedicationTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medication")
public class MedicationTrackerController {

    private final MedicationTrackerService trackerService;

    public MedicationTrackerController(MedicationTrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @GetMapping("/today")
    public ResponseEntity<List<MedicationTracker>> getTodayMedications(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(trackerService.getDailyMedications(userId));
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<MedicationTracker> toggleStatus(@PathVariable Long id) {
        return ResponseEntity.ok(trackerService.toggleStatus(id));
    }
}
