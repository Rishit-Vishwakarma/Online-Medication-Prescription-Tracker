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
import java.util.Optional;

@Service
public class DoctorService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PrescriptionRepository prescriptionRepository;
    public DoctorService(DoctorRepository doctorRepository, PrescriptionRepository prescriptionRepository, UserRepository userRepository){
        this.doctorRepository = doctorRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    public void setDoctorInfo(String doctorName, String degree, String specialization, String phoneNumber){
        Doctor doctor = new Doctor();
        doctor.setDoctorName(doctorName);
        doctor.setDegree(degree);
        doctor.setSpecialization(specialization);
        doctor.setPhoneNumber(phoneNumber);
        doctorRepository.save(doctor);
    }

    public void setPrescription(Long userId, List<String> medicines, String diagnoses, Date nextAppointmentDate){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Prescription> prescription = prescriptionRepository.findTopByUserOrderByIdDesc(user);
        if (prescription.isEmpty()){
            throw new RuntimeException("No Prescription found for this user.");
        }

        Prescription prescription1 = prescription.get();
        prescription1.setMedicines(medicines);
        prescription1.setDiagnoses(diagnoses);
        prescription1.setNextAppointmentDate(nextAppointmentDate);
        prescriptionRepository.save(prescription1);

    }


}
