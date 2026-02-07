package org.spring.loginregistration.repository;

import org.spring.loginregistration.model.MedicationTracker;
import org.spring.loginregistration.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MedicationTrackerRepository extends JpaRepository<MedicationTracker, Long> {
    List<MedicationTracker> findByUserAndDate(User user, LocalDate date);
    Optional<MedicationTracker> findByUserAndDateAndMedicineName(User user, LocalDate date, String medicineName);
}
