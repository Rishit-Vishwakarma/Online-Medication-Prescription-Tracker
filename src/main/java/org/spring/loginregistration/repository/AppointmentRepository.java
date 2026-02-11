package org.spring.loginregistration.repository;

import org.spring.loginregistration.model.Appointment;
import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByDoctorDoctorId(Long doctorId);
}
