package org.spring.loginregistration.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class PharmacyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore // Prevent circular reference and 500 errors
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> medicines;

    private double totalAmount;
    private String deliveryAddress;
    private String status; 
    private LocalDateTime orderDate;
    private String estimatedTime;
}
