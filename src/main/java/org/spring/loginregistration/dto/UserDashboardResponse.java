package org.spring.loginregistration.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class UserDashboardResponse {
    private String username;
    private String diagnosis;
    private LocalDate appointmentDate;
    private String doctorName;
    private String doctorDegree;
    private String specialization;
    private String doctorPhoneNumber;
    private List<String> medicines;
}
