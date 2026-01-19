package org.spring.loginregistration.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "doctor")
@Getter
@Setter
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String doctorName;
    private String degree;
    private String specialization;
    private String phoneNumber;
}
