package backend.application;

import backend.application.DTO.ApplicationDTO;
import backend.application.service.ApplicationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import backend.application.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication(scanBasePackages = "backend")
public class Application {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationService applicationService;

    public Application(UserService userService, PasswordEncoder passwordEncoder, ApplicationService applicationService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.applicationService = applicationService;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // CommandLineRunner to fetch data from the database
    /*@Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            // Fetch all persons from the DB
            Iterable<User> persons = controller.fetchAllPersons();

            // Iterate and print person details
            persons.forEach(p -> {
                System.out.println("ID: " + p.getPerson_ID());
                System.out.println("Name: " + p.getName());
                System.out.println("Surname: " + p.getSurname());
                System.out.println("Email: " + p.getEmail());
                System.out.println("Username: " + p.getUsername());
                System.out.println("-----------");
            });
        };
    }*/

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
           /* // Create a new user
            User user = new User();
            user.setRole_id(2);
            user.setName("test");
            user.setSurname("test");
            user.setPnr("123456789");
            user.setEmail("test.test@test.com");
            user.setUsername("test");
            user.setPassword("test");

            // Save user to the database
            User savedUser = userService.createUser(user);
            System.out.println("User added: " + savedUser);*/

            /*Integer userIdToDelete = 1011; // Replace with the ID of the user you want to delete
            boolean isDeleted = userService.deleteUserById(userIdToDelete);

            // Print result
            if (isDeleted) {
                System.out.println("User with ID " + userIdToDelete + " was deleted successfully.");
            } else {
                System.out.println("User with ID " + userIdToDelete + " was not found.");
            }*/
        };

    }
    @Bean
    public CommandLineRunner cmnd(UserService userService, PasswordEncoder passwordEncoder) {
        return args -> {
            /*
            List<ApplicationDTO> applications = applicationService.getAllExistingApplications();
            for (ApplicationDTO application : applications) {
                System.out.println(application);
            }
             */
            ApplicationDTO application = applicationService.getOneApplication(11);
            System.out.println(application);
            System.out.println(application.getUserNames().getName());
            System.out.println(application.getUserNames().getSurname());
            System.out.println(application.getStatus().getStatus());
        };
    }
}


