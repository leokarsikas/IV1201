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
import org.springframework.transaction.annotation.Transactional;

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

    public RegAppDTO getUserApplication(Integer person_id){
        System.out.println("1");
        RegAppDTO application = new RegAppDTO();
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
    public List<ApplicationDTO> getAllApplications() {
        return applicationStatusRepository.findAllApplications();
    }
    public RegAppDTO getOneApplication(Integer person_id){
        return getUserApplication(person_id);
    }

    @Transactional
    //Argumenten till de olika callsen skulle kunna ändras till objekt förstås.
    public void saveUserApplication(RegisterApplicationDTO application, Integer personId){
        try {
            if (application == null) {
                throw new IllegalArgumentException("Argument to set application is null");
            }
            if (application.getAvailabilityProfile() != null) {
                saveNewAvailabilites(application.getAvailabilityProfile(),personId);
            }
            if (application.getCompetenceProfile() != null) {
                saveNewCompetence(application.getCompetenceProfile(),personId);
            }

            System.out.println("User Application Saved");
        }
        catch (Exception e) {
            throw new RuntimeException("Error saving user application", e);
        }
    }

    @Transactional
    public void saveNewAvailabilites(List<AvailabilityDTO> newAvailabilities, Integer person_id){
        AvailabilityDTO extractedAvailability;
        Integer noOfAvailabilities = newAvailabilities.size();
        System.out.println("Timestamp: "+newAvailabilities.getFirst().getAvailabilityFrom());
        while(noOfAvailabilities > 0) {
            Availability availabilityToBeSaved = new Availability();
            extractedAvailability = newAvailabilities.get(noOfAvailabilities - 1);
            if (availabilityRepository.existsByPersonId(person_id)) {
                Integer existingAvailabilityId = null;
                /*
                List<Availability> availabilitesOfPersonID = availabilityRepository.findByPersonId(person_id);
                Integer index = availabilitesOfPersonID.size();
                while(index > 0){
                    if(availabilitesOfPersonID.get(index-1).getFrom_date().equals(extractedAvailability.getAvailabilityFrom())
                            && availabilitesOfPersonID.get(index-1).getTo_date().equals(extractedAvailability.getAvailabilityTo())){
                        existingAvailabilityId = availabilitesOfPersonID.get(index - 1).getAvailability_id();
                    }
                    index--;
                }
                 */
                existingAvailabilityId = availabilityRepository.getAvailabilityId(person_id, extractedAvailability.getAvailabilityFrom(), extractedAvailability.getAvailabilityTo());
                System.out.println("existingAvailabilityId: " + existingAvailabilityId);
                availabilityToBeSaved.setAvailability_id(existingAvailabilityId);
            } else {
                availabilityToBeSaved.setAvailability_id(null);
            }
            availabilityToBeSaved.setPerson_id(person_id);
            availabilityToBeSaved.setFrom_date(Timestamp.valueOf(extractedAvailability.getAvailabilityFrom().toString()));
            availabilityToBeSaved.setTo_date(Timestamp.valueOf(extractedAvailability.getAvailabilityTo().toString()));
            availabilityRepository.save(availabilityToBeSaved);
            noOfAvailabilities--;
            System.out.println("New availability added!");
        }
    }

    @Transactional
    public void saveNewCompetence(List<CompetenceDTO> newCompetences, Integer person_id){
        CompetenceDTO extractedCompetence;
        Integer noOfCompetences = newCompetences.size();

        System.out.println("Competences trying to add: "+noOfCompetences    );
        while(noOfCompetences > 0) {
            Competence competenceToBeSaved = new Competence();
            extractedCompetence = newCompetences.get(noOfCompetences - 1);
            if (competenceRepository.existsByPersonId(person_id)) {
                Integer existingAvailabilityId = null;
                /*
                List<Competence> competencesOfPersonID = competenceRepository.findByPersonId(person_id);
                Integer index = competencesOfPersonID.size();
                while(index > 0){
                    if(competencesOfPersonID.get(index-1).getCompetence_id().equals(convertProfession(extractedCompetence.getProfession()))){
                        existingAvailabilityId = competencesOfPersonID.get(index - 1).getCompetence_id();
                    }
                    index--;
                }
                 */
                existingAvailabilityId = competenceRepository.getCompProfileId(person_id, convertProfession(extractedCompetence.getProfession()));
                System.out.println("existingAvailabilityId: " + existingAvailabilityId);
                competenceToBeSaved.setCompetence_profile_id(existingAvailabilityId);
            } else {
                competenceToBeSaved.setCompetence_profile_id(null);
            }
            competenceToBeSaved.setPerson_id(person_id);
            competenceToBeSaved.setCompetence_id(convertProfession(extractedCompetence.getProfession()));
            competenceToBeSaved.setYears_of_experience(Double.parseDouble(extractedCompetence.getYears_of_experience()));
            competenceRepository.save(competenceToBeSaved);
            noOfCompetences--;
            System.out.println("New competence added!");
        }
    }

    private Integer convertProfession(String profession){
        if(profession.equals("Biljettförsäljare")){
            return 1;
        }
        if(profession.equals("Lotteriförsäljare")){
            return 2;
        }
        if(profession.equals("Berg och dalbansoperatör")){
            return 3;
        }
        return 0;
    }

    /*
    @Transactional
    public void setStatus(Integer person_id, String status){
        //Modify for ability to update later
        applicationStatusRepository.save(getStatus(person_id));
    }*/

}
