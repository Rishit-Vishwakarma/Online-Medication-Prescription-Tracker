package org.spring.loginregistration.service;

import org.spring.loginregistration.dto.DoctorDashboardResponse;
import org.spring.loginregistration.dto.DoctorPatientData;
import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.repository.DoctorRepository;
import org.spring.loginregistration.repository.PrescriptionRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class DoctorDashboardService {
    private final DoctorRepository doctorRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public DoctorDashboardService(DoctorRepository doctorRepository, PrescriptionRepository prescriptionRepository, UserRepository userRepository){
        this.doctorRepository = doctorRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    public DoctorDashboardResponse getInfo(Long doctorId){
        DoctorDashboardResponse doctorDashboardResponse = new DoctorDashboardResponse();
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found."));

        Optional<User> user = userRepository.findTopByDoctorOrderByIdDesc(doctor);
        if (user.isEmpty()){
            throw new RuntimeException("No User found.");
        }
        Long userId = user.map(User::getId).orElse(null) ;
        User user1 = user.get();
        Optional<Prescription> prescription = prescriptionRepository.findTopByUserOrderByIdDesc(user1);
        if(userId == null){
            throw new RuntimeException("No User found.");
        }
        if(prescription.isEmpty()){
            throw new RuntimeException("No Prescription found.");
        }
        Long PrescriptionUserId = prescription.map(Prescription::getUser).map(User::getId).orElse(null);
        if(PrescriptionUserId == null){
            throw new RuntimeException("No user found for this prescription.");
        }

        if (!userId.equals(PrescriptionUserId)){
            throw new RuntimeException("This prescription is not for this patient.");
        }

        Prescription prescription1 = prescription.get();

        doctorDashboardResponse.setDiagnosis(prescription1.getDiagnoses());
        doctorDashboardResponse.setPatientName(user1.getUsername());
        doctorDashboardResponse.setMedicines(prescription1.getMedicines());
        doctorDashboardResponse.setNextAppointmentDate(prescription1.getNextAppointmentDate());

        return doctorDashboardResponse;
    }

    public List<DoctorPatientData> getPatient(Long doctorId){
        List<DoctorPatientData> doctorPatientData = new ArrayList<>();
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        if(doctor == null){
            throw new RuntimeException("Doctor not found.");
        }

        List<User> user = userRepository.findByDoctorOrderByIdDesc(doctor);

        if(user.isEmpty()){
            return Collections.emptyList();
        }

        for(User user1 : user){
            DoctorPatientData result = new DoctorPatientData();

            Optional<Prescription> prescription = prescriptionRepository.findTopByUserOrderByIdDesc(user1);
            if(prescription.isPresent()){
                Prescription prescription1 = prescription.get();
                result.setDiagnoses(prescription1.getDiagnoses());
                result.setAppointmentDate(prescription1.getNextAppointmentDate());
            }
            result.setUserName(user1.getUsername());

            doctorPatientData.add(result);
        }


        return doctorPatientData;
    }
}
