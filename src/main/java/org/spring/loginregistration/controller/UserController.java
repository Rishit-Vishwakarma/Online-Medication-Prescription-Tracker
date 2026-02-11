package org.spring.loginregistration.controller;

import org.spring.loginregistration.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;
    private final String API_KEY = "AIzaSyBboMn-XijOsS5GMZcEIJTTwheCB30Ocbo"; 
    private final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> request){
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        
        userService.registerUser(username, email, password);
        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String password = request.get("password");
        String msg = userService.loginUser(email, password);
        return ResponseEntity.ok("Login Successful. Token: " + msg);
    }

    @PostMapping("/user/chatbot")
    public ResponseEntity<Map<String, String>> askChatbot(@RequestBody Map<String, String> request) {
        System.out.println("🔥 CHATBOT REQUEST HIT! Message: " + request.get("message"));

        String userMessage = request.get("message");

        try {
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> content = new HashMap<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", "You are a helpful medical assistant. Keep answers short. User: " + userMessage);
            content.put("parts", Collections.singletonList(part));
            
            Map<String, Object> body = new HashMap<>();
            body.put("contents", Collections.singletonList(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, entity, Map.class);
            
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> contentMap = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
                    String aiResponse = (String) parts.get(0).get("text");
                    
                    return ResponseEntity.ok(Collections.singletonMap("response", aiResponse));
                }
            }
            
            return ResponseEntity.ok(Collections.singletonMap("response", "I couldn't understand that."));

        } catch (HttpClientErrorException e) {
            System.err.println("Google API Error: " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode()).body(Collections.singletonMap("response", "AI Error: " + e.getStatusText()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("response", "Internal Server Error: " + e.getMessage()));
        }
    }
}
