package org.spring.loginregistration.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DoctorDTO {
    private Long doctorId;
    private String userName;
    private String email;
}
