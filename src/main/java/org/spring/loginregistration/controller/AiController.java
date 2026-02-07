package org.spring.loginregistration.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final String API_KEY = "AIzaSyBboMn-XijOsS5GMZcEIJTTwheCB30Ocbo"; 
    private final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        System.out.println("✅ AI Controller Hit: " + request.get("message"));
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

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("response", "Error: " + e.getMessage()));
        }
    }
}
