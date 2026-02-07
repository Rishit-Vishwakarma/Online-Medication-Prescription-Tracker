package org.spring.loginregistration.service;

import org.spring.loginregistration.model.MedicationTracker;
import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.repository.MedicationTrackerRepository;
import org.spring.loginregistration.repository.PrescriptionRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MedicationTrackerService {

    private final MedicationTrackerRepository trackerRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public MedicationTrackerService(MedicationTrackerRepository trackerRepository, PrescriptionRepository prescriptionRepository, UserRepository userRepository) {
        this.trackerRepository = trackerRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    public List<MedicationTracker> getDailyMedications(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        LocalDate today = LocalDate.now();

        // 1. Get existing tracker entries for today
        List<MedicationTracker> trackers = trackerRepository.findByUserAndDate(user, today);

        // 2. If empty, populate from latest prescription
        if (trackers.isEmpty()) {
            Optional<Prescription> prescriptionOpt = prescriptionRepository.findTopByUserOrderByIdDesc(user);
            if (prescriptionOpt.isPresent()) {
                Prescription prescription = prescriptionOpt.get();
                for (String med : prescription.getMedicines()) {
                    MedicationTracker tracker = new MedicationTracker();
                    tracker.setUser(user);
                    tracker.setMedicineName(med);
                    tracker.setDate(today);
                    tracker.setTaken(false);
                    trackers.add(trackerRepository.save(tracker));
                }
            }
        }
        return trackers;
    }

    public MedicationTracker toggleStatus(Long trackerId) {
        MedicationTracker tracker = trackerRepository.findById(trackerId)
                .orElseThrow(() -> new RuntimeException("Tracker not found"));
        tracker.setTaken(!tracker.isTaken());
        return trackerRepository.save(tracker);
    }
}
