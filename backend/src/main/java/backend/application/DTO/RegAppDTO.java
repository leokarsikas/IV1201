package backend.application.DTO;

import backend.application.Application;
import backend.application.model.ApplicationStatus;
import backend.application.model.Availability;
import backend.application.model.Competence;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Data Transfer Object (DTO) used for representing a registration application.
 * This class contains the necessary data for a user application, including their
 * availability, competences, application status, and user details.
 *
 * <p>This class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, reducing boilerplate code.</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RegAppDTO {

    /**
     * The list of {@link Availability} associated with the user's registration application.
     * This represents the user's available times or schedules.
     */
    private List<Availability> availability;
    /**
     * The list of {@link Competence} associated with the user's registration application.
     * This represents the skills or qualifications the user possesses.
     */
    private List<Competence> competence;
    /**
     * The {@link ApplicationStatus} representing the current status of the user's application.
     * This can indicate whether the application is pending, approved, or rejected.
     */
    private ApplicationStatus status;
    /**
     * The unique identifier for the person associated with the application.
     */
    private Integer person_id;
    /**
     * A {@link UserNameDTO} object that contains the user's first name and surname.
     * This DTO represents a simplified version of the user's name.
     */
    private UserNameDTO userNames;
    /**
     * The first name of the person registering the application.
     */
    private String name;
    /**
     * The surname of the person registering the application.
     */
    private String surname;

    /**
     * Constructs a new {@code RegAppDTO} from the provided {@link Application} object.
     * This constructor allows for transforming an {@code Application} entity into a
     * {@code RegAppDTO} by extracting relevant details such as availability, competences,
     * status, and user name.
     *
     * @param application the {@link Application} object from which to extract data
     */

    public RegAppDTO(Application application) {

    }
}