package org.spring.loginregistration.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorProfileResponse {
    private String fullName;
    private String degreeName;
    private String specialization;
    private String mobileNumber;
    private String experienceYears;
    private String clinicAddress;
}
