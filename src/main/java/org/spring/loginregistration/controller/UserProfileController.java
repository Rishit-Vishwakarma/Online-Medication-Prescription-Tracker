package org.spring.loginregistration.controller;

import org.spring.loginregistration.dto.UserProfileResponse;
import org.spring.loginregistration.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileController {

    private final UserProfileService userProfileService;
    public UserProfileController(UserProfileService userProfileService){
        this.userProfileService = userProfileService;
    }

    @GetMapping("/User/profile/{userId}")
    public ResponseEntity<UserProfileResponse> getInfo(@PathVariable Long userId){
        return ResponseEntity.ok(userProfileService.gettingInfo(userId));
    }

    @PostMapping("/User/profile")
    public void setInfo(@RequestParam Long userId, @RequestBody UserProfileResponse userProfileResponse){
        userProfileService.settingInfo(userId, userProfileResponse);
    }

    @PutMapping("/User/profile")
    public void editInfo(@RequestParam Long userId, @RequestBody UserProfileResponse userProfileResponse){
        userProfileService.updateInfo(userId, userProfileResponse);
    }

    @GetMapping("/doctor/profile/{userId}")
    public ResponseEntity<UserProfileResponse> getInfoDoctor(@PathVariable Long userId){
        return ResponseEntity.ok(userProfileService.gettingInfo(userId));
    }

}
