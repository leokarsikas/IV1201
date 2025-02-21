package backend.application.controller;

import backend.application.model.Application;
import backend.application.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/get-all-applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

}
