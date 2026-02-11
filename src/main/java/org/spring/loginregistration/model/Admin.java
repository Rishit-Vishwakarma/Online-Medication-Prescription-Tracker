package org.spring.loginregistration.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long adminId;

    private String userName;
    private String email;
    private String password;

    @OneToMany(mappedBy = "admin")
    private List<User> users;

    @OneToMany
    @JoinColumn(name = "admin_id")
    private List<Doctor> doctors;
}
