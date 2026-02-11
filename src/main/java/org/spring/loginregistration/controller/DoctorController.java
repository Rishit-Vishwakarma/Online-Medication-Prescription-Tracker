package org.spring.loginregistration.controller;

import org.spring.loginregistration.dto.DoctorPatientData;
import org.spring.loginregistration.dto.PrescriptionRequest;
import org.spring.loginregistration.security.JwtService;
import org.spring.loginregistration.service.DoctorService;
import org.spring.loginregistration.service.PrescriptionService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class DoctorController {

    private final DoctorService doctorService;
    private final JwtService jwtService;
    private final PrescriptionService prescriptionService;

    public DoctorController(DoctorService doctorService, JwtService jwtService, PrescriptionService prescriptionService){
        this.doctorService = doctorService;
        this.jwtService = jwtService;
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/doctor/register")
    public String doctorRegister(@RequestBody Map<String, String> request){
         String userName = request.get("userName");
         String email = request.get("email");
         String password = request.get("password");
         return doctorService.doctorRegistration(userName, email, password);
    }

    @PostMapping("/doctor/login")
    public String doctorLogin(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String password = request.get("password");
        return "Login Successful. Token: " + doctorService.doctorLogin(email, password);
    }

    @GetMapping("/doctor/myUsers")
    public List<DoctorPatientData> getMyUsers(Authentication authentication){
        Long doctorId = (Long) authentication.getPrincipal();
        return doctorService.getMyUsers(doctorId);
    }

    @PostMapping("/doctor/prescription")
    public String writePrescription(@RequestBody PrescriptionRequest request, Authentication authentication){
        Long doctorId = (Long) authentication.getPrincipal();

        prescriptionService.savePrescription(
                doctorId, 
                request.getUserId(), 
                request.getMedicines(), 
                request.getDiagnosis(), 
                request.getNote(), 
                request.getNextAppointmentDate()
        );

        return "Prescription sent successfully!";
    }
}
