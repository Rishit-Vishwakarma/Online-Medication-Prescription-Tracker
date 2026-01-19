package org.spring.loginregistration.service;

import org.spring.loginregistration.dto.UserDashboardResponse;
import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.Prescription;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.repository.PrescriptionRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.spring.loginregistration.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDashboardService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PrescriptionRepository prescriptionRepository;

    public UserDashboardService(UserRepository userRepository, DoctorRepository doctorRepository, PrescriptionRepository prescriptionRepository){
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    public UserDashboardResponse giveInfo(Long UserId){
        UserDashboardResponse response = new UserDashboardResponse();

        Optional<User> optionalUser = userRepository.findById(UserId);


        if(optionalUser.isEmpty()){
            throw new RuntimeException("User not found.");
        }
            User user = optionalUser.get();
            Doctor doctor1 = user.getDoctor();

            if (doctor1 == null){
                throw new RuntimeException("No Doctor Exist for this patient.");
            }
            Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor1.getId());
            if (optionalDoctor.isEmpty()){
                throw new RuntimeException("Doctor not found.");
            }
        Optional<Prescription> optionalPrescription = prescriptionRepository.
                findTopByUserOrderByIdDesc(user);
            if (optionalPrescription.isEmpty()){
                throw new RuntimeException("Prescription not found.");
            }

            Doctor doctor = optionalDoctor.get();
            Prescription prescription = optionalPrescription.get();


            response.setUsername(user.getUsername());
            response.setDoctorName(doctor.getDoctorName());
            response.setDoctorDegree(doctor.getDegree());
            response.setSpecialization(doctor.getSpecialization());
            response.setDoctorPhoneNumber(doctor.getPhoneNumber());
            response.setAppointmentDate(prescription.getNextAppointmentDate());
            response.setDiagnosis(prescription.getDiagnoses());
            response.setMedicines(prescription.getMedicines());
            return response;




    }
}
