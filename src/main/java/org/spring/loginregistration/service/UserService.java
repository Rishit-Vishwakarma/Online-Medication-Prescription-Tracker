package org.spring.loginregistration.service;

import org.spring.loginregistration.model.Doctor;
import org.spring.loginregistration.model.User;
import org.spring.loginregistration.repository.DoctorRepository;
import org.spring.loginregistration.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, DoctorRepository doctorRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(String userName, String email, String password, Long doctorId){

        if(userRepository.findByEmail(email).isPresent()){
            throw new RuntimeException("Email already exits.");
        }

        String encodePassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword(encodePassword);

        if (doctorId != null) {
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            user.setDoctor(doctor);
        }

        userRepository.save(user);
    }

    public String loginUser(String email, String password){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RuntimeException("No email exist.");
        }

        User user = optionalUser.get();

        boolean isPasswordCorrect = passwordEncoder.matches(password, user.getPassword());

            if(!isPasswordCorrect){
                throw new RuntimeException("Password Incorrect");
            }

            return "Login Successfully";
    }

}
