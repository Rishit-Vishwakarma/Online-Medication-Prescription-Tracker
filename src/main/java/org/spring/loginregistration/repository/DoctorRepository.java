package org.spring.loginregistration.repository;

import org.spring.loginregistration.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
