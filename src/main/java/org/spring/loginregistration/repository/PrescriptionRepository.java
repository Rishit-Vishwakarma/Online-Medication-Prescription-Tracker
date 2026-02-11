package org.spring.loginregistration.repository;

import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    // Sort by ID Descending to get latest first
    List<Prescription> findByUserOrderByIdDesc(User user);
    Optional<Prescription> findTopByUserOrderByIdDesc(User user);
}
