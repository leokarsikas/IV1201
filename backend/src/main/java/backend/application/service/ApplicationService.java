package backend.application.service;

import backend.application.model.Competence;
import backend.application.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class ApplicationService {

    @Autowired
    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }


    public boolean SubmitApplication(Competence competence){

        return false;
    }
}
