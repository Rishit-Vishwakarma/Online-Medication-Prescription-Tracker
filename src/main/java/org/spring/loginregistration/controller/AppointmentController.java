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
            @RequestParam Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
            @RequestParam String reason) {
        
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(appointmentService.bookAppointment(userId, doctorId, date, time, reason));
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
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }
}
