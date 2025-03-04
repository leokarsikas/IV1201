package backend.application.service;

import backend.application.model.Competence;
import backend.application.repository.CompetenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private final CompetenceRepository competenceRepository;

    public ApplicationService(CompetenceRepository competenceRepository) {
        this.competenceRepository = competenceRepository;
    }


    public boolean SubmitApplication(Competence competence){

        return false;
    }
}
