package org.spring.loginregistration.service;

import org.spring.loginregistration.model.User;
import org.spring.loginregistration.repository.UserRepository;
import org.spring.loginregistration.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public void registerUser(String userName, String email, String password){
        if(userRepository.findByEmail(email).isPresent()){
            throw new RuntimeException("Email already exists.");
        }

        String encodePassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword(encodePassword);

        userRepository.save(user);
    }

    public String loginUser(String email, String password){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RuntimeException("No email found.");
        }

        User user = optionalUser.get();
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Password Incorrect");
        }

        return jwtService.generateToken(user.getId(), "USER");
    }
}
