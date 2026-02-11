package org.spring.loginregistration.repository;

import org.spring.loginregistration.model.PharmacyOrder;
import org.spring.loginregistration.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PharmacyOrderRepository extends JpaRepository<PharmacyOrder, Long> {
    // Sort by ID Descending to get latest first
    List<PharmacyOrder> findByUserOrderByIdDesc(User user);
    List<PharmacyOrder> findAllByOrderByIdDesc();
}
