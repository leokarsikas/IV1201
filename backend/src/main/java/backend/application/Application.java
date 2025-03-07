package backend.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot application.
 * <p>
 * This class initializes the Spring context and runs the application.
 * The {@link SpringApplication#run(Class, String[])} method is used to start the application.
 * </p>
 */
@SpringBootApplication(scanBasePackages = "backend")
public class Application {

    /**
     * The main method, which serves as the entry point for the Spring Boot application.
     *
     * @param args command-line arguments passed when starting the application
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}



