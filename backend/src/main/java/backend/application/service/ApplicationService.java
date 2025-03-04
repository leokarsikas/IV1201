package backend.application.service;

import backend.application.DTO.*;
import backend.application.model.ApplicationStatus;
import backend.application.model.User;
import backend.application.model.Availability;
import backend.application.model.Competence;
import backend.application.repository.ApplicationStatusRepository;
import backend.application.repository.AvailabilityRepository;
import backend.application.repository.CompetenceRepository;
import backend.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final AvailabilityRepository availabilityRepository;
    private final CompetenceRepository competenceRepository;
    private final UserRepository userRepository;
    private final ApplicationStatusRepository applicationStatusRepository;


    public ApplicationService(AvailabilityRepository availabilityRepository, CompetenceRepository competenceRepository, UserRepository userRepository, ApplicationStatusRepository applicationStatusRepository) {
        this.availabilityRepository = availabilityRepository;
        this.competenceRepository = competenceRepository;
        this.userRepository = userRepository;
        this.applicationStatusRepository = applicationStatusRepository;
    }


    public ApplicationDTO getUserApplication(Integer person_id){

        ApplicationDTO application = new ApplicationDTO();

        return application;
    }

    //Returns the first and last name of a user
    private UserNameDTO getUserFirstAndLastName(Integer person_id){
        User user = userRepository.findById(person_id.longValue()).orElse(null);
        UserNameDTO userNameDTO = new UserNameDTO(user);
        userNameDTO.setName(user.getName());
        userNameDTO.setSurname(user.getSurname());
        return userNameDTO;
    }

    /*private ApplicationStatus getStatus(Integer personID){
        return applicationStatusRepository.findByPersonId(personID);
    }*/

    //Returns all applications in the database
    public List<ApplicationDTO> getAllApplications() {
        return applicationStatusRepository.findAllApplications();
    }
    //Returns one applications from the database for testing
    public ApplicationDTO getOneApplication(Integer person_id){
        ApplicationDTO application;
        application = getUserApplication(person_id);
        return getUserApplication(person_id);
    }

    /*

    private List<Competence> getUserCompetence(Integer person_id){
        System.out.println(competenceRepository.findByPersonId(person_id));
        return competenceRepository.findByPersonId(person_id);
    }

    private List<Availability> getUserAvailability(Integer person_id){
        return availabilityRepository.findByPersonId(person_id);
    }

    //Could be changed to four individual calls for each relevant resource,
    //rather than getting unnecessary information
    private UserDTO getUserDTO(Integer personID){
        Optional<User> user = userRepository.findById(personID);
        return user.isPresent() ? new UserDTO(user.get()) : null;
    }

     */


    //Argumenten till de olika callsen skulle kunna ändras till objekt förstås.
    public void saveUserApplication(ApplicationDTO application){
        try {
            if (application == null) {
                throw new IllegalArgumentException("Argument to set application is null");
            }
            Integer personId = application.getPerson_id();
            if (application.getAvailability() != null) {
                saveNewAvailabilites(application.getAvailability(),personId);
            }
            if (application.getCompetence() != null) {
                saveNewCompetence(application.getCompetence(),personId);
            }
        }
        catch (Exception e) {
            throw new RuntimeException("Error saving user application", e);
        }
    }

    public void saveNewAvailabilites(List<Availability> newAvailabilities, Integer person_id){
        Availability extractedAvailability;
        Integer noOfAvailabilities = newAvailabilities.size();
        while(noOfAvailabilities > 0) {
            Availability availabilityToBeSaved = new Availability();
            extractedAvailability = newAvailabilities.get(noOfAvailabilities - 1);
            if (availabilityRepository.existsByPersonId(person_id)) {
                System.out.println("TRVE");
                Integer existingAvailabilityId = availabilityRepository.getAvailabilityId(person_id, extractedAvailability.getAvailability_id());
                availabilityToBeSaved.setAvailability_id(existingAvailabilityId);
            } else {
                //availability.setAvailability_id... Generera nytt id, görs det i databasen automatiskt?
            }
            availabilityToBeSaved.setPerson_id(person_id);
            availabilityToBeSaved.setAvailability_id(extractedAvailability.getAvailability_id());
            availabilityToBeSaved.setFrom_date(Timestamp.valueOf(extractedAvailability.getFrom_date().toString()));
            availabilityToBeSaved.setTo_date(Timestamp.valueOf(extractedAvailability.getTo_date().toString()));
            availabilityRepository.save(availabilityToBeSaved);
            System.out.println("ASDKÖ"+availabilityRepository.existsById(person_id));
            System.out.println("JASDKLASJDÖLKAJDÖLSADJÖ");
            noOfAvailabilities--;
        }
    }

    public void saveNewCompetence(List<Competence> newCompetences, Integer person_id){
        Competence extractedCompetence;
        Integer noOfCompetences = newCompetences.size();
        while(noOfCompetences > 0) {
            Competence competenceToBeSaved = new Competence();
            extractedCompetence = newCompetences.get(noOfCompetences - 1);
            if (competenceRepository.existsByPersonId(person_id)) {
                System.out.println(competenceRepository.existsByPersonId(person_id));



                /*
                OBS! Dessa är bara temporära! Så fort competenceRepository.getCompetenceProfileId(person_id, extractedCompetence.getCompetence_id())
                funkar så ska vi byta till den. Det är något fel med queryn eller nåt.
                Competence testComp = competenceRepository.getReferenceById(5000);
                Integer existingCompetenceProfileId = testComp.getCompetence_profile_id();
                 */
                //Integer existingCompetenceProfileId = competenceRepository.getCompetenceProfileId(person_id, extractedCompetence.getCompetence_id());
                Competence testComp = competenceRepository.getReferenceById(5000);
                Integer existingCompetenceProfileId = testComp.getCompetence_profile_id();
                competenceToBeSaved.setCompetence_profile_id(existingCompetenceProfileId);
            } else {
                //competence.setCompetence_profile_id()... Generera nytt id, görs det i databasen automatiskt?
            }
            competenceToBeSaved.setPerson_id(person_id);
            competenceToBeSaved.setCompetence_id(extractedCompetence.getCompetence_id());
            competenceToBeSaved.setYears_of_experience(extractedCompetence.getYears_of_experience());
            competenceRepository.save(competenceToBeSaved);
            noOfCompetences--;
        }
    }

    public void setStatus(Integer person_id, String status){
        //Modify for ability to update later
        applicationStatusRepository.save(getStatus(person_id));
    }

}