package org.spring.loginregistration.service;

import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.repository.DoctorRepository;
import org.spring.loginregistration.repository.PrescriptionRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository, UserRepository userRepository, DoctorRepository doctorRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }


    public void addPrescription(List<String> medicines, String diagnoses, Date nextAppointmentDate, Long userId, Long doctorId) {
        Prescription prescription = new Prescription();

        prescription.setMedicines(medicines);
        prescription.setDiagnoses(diagnoses);
        prescription.setNextAppointmentDate(nextAppointmentDate);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found."));
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found."));
        prescription.setUser(user);
        prescription.setDoctor(doctor);

        prescriptionRepository.save(prescription);
    }
}
