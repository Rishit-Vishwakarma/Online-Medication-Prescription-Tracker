package org.spring.loginregistration.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DoctorPatientData {
    private Long id;
    private String userName;
    private String email;
    private String gender;
    private int age;
    private String symptoms;
    private String allergies; // Added
    private String note;      // Added
    private String diagnoses;
    private LocalDate appointmentDate;
}
