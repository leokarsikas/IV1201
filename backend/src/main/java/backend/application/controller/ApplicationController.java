package backend.application.controller;

import backend.application.DTO.ApplicationDTO;
import backend.application.DTO.RegAppDTO;
import backend.application.DTO.RegisterApplicationDTO;

import backend.application.service.ApplicationService;
import backend.application.service.AuthService;
import backend.application.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class responsible for handling HTTP requests related to application management,
 * including sending applications, retrieving all applications, and retrieving a specific user's application.
 *
 * <p>This class exposes endpoints for handling applications submitted by users and fetching application data.
 * It interacts with the service layer to process application-related operations.</p>
 */

@RestController
@RequestMapping("/api")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final UserService userService;

    /**
     * Constructs a new {@code ApplicationController} with the specified {@link ApplicationService} and {@link UserService}.
     *
     * @param applicationService the service layer responsible for handling application operations
     * @param authService the service layer responsible for handling authentication
     * @param userService the service layer responsible for user-related operations
     */
    public ApplicationController(ApplicationService applicationService, AuthService authService, UserService userService) {
        this.applicationService = applicationService;
        this.userService = userService;
    }

    /**
     * Endpoint for submitting a new user application.
     * <p>This method takes an application DTO (Data Transfer Object) containing the user's application details,
     * saves the application data to the database, and returns a response indicating the result of the operation.</p>
     *
     * @param appDTO the {@link RegisterApplicationDTO} containing the application data to be saved
     * @return a {@link ResponseEntity} indicating the status of the application submission
     */
    @PostMapping("/send-application")
    public ResponseEntity<Object> sendApplication(@RequestBody RegisterApplicationDTO appDTO) {
        try{
            System.out.println(appDTO.getAvailabilityProfile().getFirst().getAvailabilityTo());
            System.out.println(appDTO.getCompetenceProfile().getFirst().getProfession());
            System.out.println("APPUSERNAME"+appDTO.getUserName());
            applicationService.saveUserApplication(appDTO,userService.getUserPersonId(appDTO.getUserName()));
            return ResponseEntity.status(HttpStatus.CREATED).body(appDTO);
        }
        catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
        }
    }

    /**
     * Endpoint for retrieving all applications.
     * <p>This method returns a list of all applications in the system.</p>
     *
     * @return a {@link ResponseEntity} containing a list of {@link ApplicationDTO} objects representing all applications
     */
    @GetMapping("admin/get-all-applications")
    public ResponseEntity<Object> getAllApplications() {
        List<ApplicationDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.status(HttpStatus.CREATED).body(applications);
    }


    /**
     * Endpoint for retrieving a specific user's application based on their person ID.
     * <p>This method fetches the application data of a user using their person ID and returns it in the response.</p>
     *
     * @param personID the ID of the user whose application is to be retrieved
     * @return a {@link ResponseEntity} containing the {@link RegAppDTO} with the user's application data
     */
    @GetMapping("user/get-application")
    public ResponseEntity<Object> getApplication(@RequestBody Integer personID) {
        RegAppDTO application = applicationService.getUserApplication(personID);
        return ResponseEntity.status(HttpStatus.CREATED).body(application);
    }

}
