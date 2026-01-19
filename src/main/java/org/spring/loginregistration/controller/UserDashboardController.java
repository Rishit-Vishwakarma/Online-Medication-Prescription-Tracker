package org.spring.loginregistration.controller;

import org.spring.loginregistration.dto.UserDashboardResponse;
import org.spring.loginregistration.service.UserDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserDashboardController {
    private final UserDashboardService userDashboardService;
    public UserDashboardController(UserDashboardService userDashboardService){
        this.userDashboardService = userDashboardService;
    }

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<UserDashboardResponse> getdata(@PathVariable Long userId){
        return ResponseEntity.ok(userDashboardService.giveInfo(userId));
    }
}
