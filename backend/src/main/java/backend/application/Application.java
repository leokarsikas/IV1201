package backend.application;

import backend.application.model.person;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import backend.application.repo.personRepository;

@SpringBootApplication(scanBasePackages = "backend")
public class Application {

    private final personRepository personRepo;

    // Constructor Injection of the repository
    public Application(personRepository personRepo) {
        this.personRepo = personRepo;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // CommandLineRunner to fetch data from the database
    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            // Fetch all persons from the DB
            Iterable<person> persons = personRepo.findAll();

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
    }
}

	


