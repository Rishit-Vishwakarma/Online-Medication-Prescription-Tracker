package org.spring.loginregistration.controller;

import org.spring.loginregistration.model.Appointment;
import org.spring.loginregistration.service.AppointmentService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/book")
    public ResponseEntity<Appointment> book(
            Authentication authentication,
            @RequestBody Map<String, String> request) {
        
        Long userId = (Long) authentication.getPrincipal();
        LocalDate date = LocalDate.parse(request.get("date"));
        LocalTime time = LocalTime.parse(request.get("time"));
        String reason = request.get("reason");

        return ResponseEntity.ok(appointmentService.bookAppointment(userId, date, time, reason));
    }

    @GetMapping("/my-patient")
    public ResponseEntity<List<Appointment>> getPatientAppointments(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(appointmentService.getPatientAppointments(userId));
    }

    @GetMapping("/my-doctor")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(Authentication authentication) {
        Long doctorId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(appointmentService.getDoctorAppointments(doctorId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }
}
