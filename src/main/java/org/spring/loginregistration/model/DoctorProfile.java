package org.spring.loginregistration.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DoctorProfile {
    @Id
    private Long id; // Same as Doctor ID

    private String fullName;
    private String mobileNumber;
    private String degreeName;
    private String specialization;
    private String experienceYears;
    private String clinicAddress;
    private String bio;

    private String profilePhotoUrl;
    private String degreePhotoUrl;

    @OneToOne
    @JoinColumn(name = "doctor_id", unique = true)
    private Doctor doctor;

    public boolean isComplete() {
        return fullName != null && !fullName.isEmpty() &&
               mobileNumber != null && !mobileNumber.isEmpty() &&
               degreeName != null && !degreeName.isEmpty() &&
               specialization != null && !specialization.isEmpty();
    }
}
