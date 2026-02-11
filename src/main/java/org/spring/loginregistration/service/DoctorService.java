package org.spring.loginregistration.service;

import org.spring.loginregistration.dto.DoctorPatientData;
import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.model.UserProfile;
import org.spring.loginregistration.repository.DoctorRepository;
import org.spring.loginregistration.repository.UserProfileRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.spring.loginregistration.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    public DoctorService(DoctorRepository doctorRepository, PasswordEncoder passwordEncoder, JwtService jwtService, UserRepository userRepository, UserProfileRepository userProfileRepository){
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    public String doctorRegistration(String userName, String email, String password){
        if(doctorRepository.findDoctorByEmail(email).isPresent()){
            throw new RuntimeException("Email already exists.");
        }
        String encodePassword = passwordEncoder.encode(password);
        Doctor doctor = new Doctor();
        doctor.setUserName(userName);
        doctor.setEmail(email);
        doctor.setPassword(encodePassword);
        doctorRepository.save(doctor);
        return "Doctor registered successfully.";
    }

    public String doctorLogin(String email, String password){
        Doctor doctor = doctorRepository.findDoctorByEmail(email).orElse(null);
        if(doctor == null){
            throw new RuntimeException("No email found.");
        }
        if (!passwordEncoder.matches(password, doctor.getPassword())){
            throw new RuntimeException("Password Incorrect.");
        }
        return jwtService.generateToken(doctor.getDoctorId(), "DOCTOR");
    }

    public List<DoctorPatientData> getMyUsers(Long doctorId){
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("No doctor found"));
        
        List<User> users = userRepository.findByDoctorOrderByIdDesc(doctor);

        if(users.isEmpty()){
            return Collections.emptyList();
        }

        List<DoctorPatientData> patientDataList = new ArrayList<>();

        for(User user : users){
            DoctorPatientData doctorPatientData = new DoctorPatientData();
            doctorPatientData.setId(user.getId());
            doctorPatientData.setUserName(user.getUsername());
            doctorPatientData.setEmail(user.getEmail());

            Optional<UserProfile> userProfileOpt = userProfileRepository.findByUser(user);
            if(userProfileOpt.isPresent()){
                UserProfile profile = userProfileOpt.get();
                doctorPatientData.setGender(profile.getGender());
                doctorPatientData.setSymptoms(profile.getSymptoms());
                doctorPatientData.setAge(profile.getAge());
                doctorPatientData.setAllergies(profile.getAllergies());
                doctorPatientData.setNote(profile.getNote());
            } else {
                doctorPatientData.setSymptoms("Profile not set");
                doctorPatientData.setAllergies("None");
                doctorPatientData.setNote("No notes");
            }

            patientDataList.add(doctorPatientData);
        }
        return patientDataList;
    }
}
