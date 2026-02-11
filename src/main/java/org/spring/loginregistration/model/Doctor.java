package org.spring.loginregistration.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "doctors")
@Getter
@Setter
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long doctorId;

    private String userName;
    private String email;
    
    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnoreProperties("doctor") // Allow list of users, but don't show their doctor field
    private List<User> users;

    @OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("doctor")
    private DoctorProfile doctorProfile;
}
