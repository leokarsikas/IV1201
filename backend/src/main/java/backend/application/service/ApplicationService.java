package backend.application.service;

import backend.application.model.Application;
import backend.application.repository.ApplicationRepository;

import java.util.List;

public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    //Get all existing applications
    public List<Application> getAllApplications(){
        return applicationRepository.findAll();
    }
}
