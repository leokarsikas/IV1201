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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private final AvailabilityRepository availabilityRepository;
    @Autowired
    private final CompetenceRepository competenceRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ApplicationStatusRepository applicationStatusRepository;


    public ApplicationService(AvailabilityRepository availabilityRepository, CompetenceRepository competenceRepository, UserRepository userRepository, ApplicationStatusRepository applicationStatusRepository) {
        this.availabilityRepository = availabilityRepository;
        this.competenceRepository = competenceRepository;
        this.userRepository = userRepository;
        this.applicationStatusRepository = applicationStatusRepository;
    }


    public ApplicationDTO getUserApplication(Integer person_id){
        System.out.println("1");
        ApplicationDTO application = new ApplicationDTO();
        application.setUserNames(getUserFirstAndLastName(person_id));
        application.setStatus(getStatus(person_id));
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

    private ApplicationStatus getStatus(Integer personID){
        return applicationStatusRepository.findByPersonId(personID);
    }

    //Returns all applications in the database
    public List<ApplicationDTO> getAllExistingApplications(){
        List<Integer> ids = userRepository.findAllIdsByRoleIdTwo();
        for (Integer id : ids) {
            System.out.println(id);
        }
        List<ApplicationDTO> applications = new ArrayList<>();
        for(Integer id : ids) {
            System.out.println(id);
            if (getStatus(id) != null) //Not sure about the type conversion.
                applications.add(getUserApplication(id)); //Not sure about the type conversion.
        }
        return applications;
    }

    //Returns one applications from the database for testing
    public ApplicationDTO getOneApplication(Integer person_id){
        ApplicationDTO application;
        application = getUserApplication(person_id);
        System.out.println(application.getUserNames());
        System.out.println(application.getStatus());
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




/*
    //Argumenten till de olika callsen skulle kunna ändras till objekt förstås.
    public ApplicationDTO setUserApplication(ApplicationDTO application){
        if (application == null) {
            System.out.println("Argument to set application is null");
            return null;
        }
        if(application.getAvailability() != null){
            List<AvailabilityDTO> availabilities = application.getAvailability();
            saveNewAvailabilites(availabilities);
        }
        if(application.getCompetence() != null){
            List<CompetenceDTO> competences = application.getCompetence();
            saveNewCompetence();
        }
        if(application.getUser() != null){
            User user = application.getUser();
            setUser(
                user.getPerson_ID(),
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getPnr(),
                user.getEmail()
            );
        }
        return application;
    }

    public void saveNewAvailabilites(List<AvailabilityDTO> availabilities){
        //Modify for ability to update later
        List<AvailabilityDTO> availabilityDTOs = new ArrayList<>();
        for(AvailabilityDTO availability : availabilities){
            availabilityDTOs.add(availability);
        }
        availabilityRepository.save(availabilityDTOs);
    }

    //Parametrar skulle kunna ändras till objekt förstås.
    public void saveNewCompetence(Integer personID, Integer competence_profile_id, Integer competence_id, Double years_of_experience){
        //Modify for ability to update later
        Competence competence = new Competence();
        competence.setCompetence_profile_id(competence_profile_id);
        competence.setCompetence_id(competence_id);
        competence.setYears_of_experience(years_of_experience);
        competenceRepository.save(competence);
    }

    //Parametrar skulle kunna ändras till objekt förstås.
    public void setUser(Integer personID, String username, String name, String surname, String pnr, String email){
        //Modify for ability to update later
        User user = new User();
        user.setUsername(username);
        user.setName(name);
        user.setSurname(surname);
        user.setPnr(pnr);
        user.setEmail(email);
        userRepository.save(user);
    }

    public void setStatus(Integer personID, String status){
        //Modify for ability to update later
        ApplicationDTO application = new ApplicationDTO();
        application.setStatus(status);
    }

 */

}