package backend.application.controller;

import backend.application.DTO.ApplicationDTO;
import backend.application.DTO.RegAppDTO;
import backend.application.DTO.RegisterApplicationDTO;
import backend.application.model.Competence;
import backend.application.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/send-application")
    public ResponseEntity<Object> sendApplication(@RequestBody RegisterApplicationDTO appDTO) {
        System.out.println(appDTO.availabilityProfile.getFirst().availabilityFrom);
        System.out.println(appDTO.competenceProfile.getFirst().profession);
        return ResponseEntity.status(HttpStatus.CREATED).body(appDTO);
    }

    @GetMapping("admin/get-all-applications")
    public ResponseEntity<Object> getAllApplications() {
        List<ApplicationDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.status(HttpStatus.CREATED).body(applications);
    }

    @GetMapping("user/get-application")
    public ResponseEntity<Object> getApplication(@RequestBody Integer personID) {
        RegAppDTO application = applicationService.getUserApplication(personID);
        return ResponseEntity.status(HttpStatus.CREATED).body(application);
    }

    @PostMapping("/user/create-application")
    public ResponseEntity<Object> createApplication(@RequestBody RegAppDTO application) {
        try{
            applicationService.saveUserApplication(application);
            return ResponseEntity.status(HttpStatus.CREATED).body(application);
        }
        catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
        }
    }
}
