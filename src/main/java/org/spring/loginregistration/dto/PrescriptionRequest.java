package org.spring.loginregistration.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class PrescriptionRequest {
    private Long userId;
    private String diagnosis;
    private List<String> medicines;
    private String note;
    private LocalDate nextAppointmentDate;
}
