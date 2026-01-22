package org.spring.loginregistration.security;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String generateToken(Long userId) {
        return null;
    }

    public boolean validateToken(String token) {
        return false;
    }

    public Long extractUserId(String token) {
        return null;
    }

}