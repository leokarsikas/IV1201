package backend.application.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 * Data Transfer Object (DTO) for registering an application.
 * This class encapsulates the user's competence profile, availability profile,
 * and username during the application registration process.
 *
 * <p>The class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, minimizing boilerplate code.</p>
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods


public class RegisterApplicationDTO {

    /**
     * The list of competences associated with the user, used for registering
     * the application. Each competence is represented by a {@link CompetenceDTO}.
     */
    private List<CompetenceDTO> competenceProfile;
    /**
     * The list of availability details associated with the user, used for
     * registering the application. Each availability item is represented by
     * an {@link AvailabilityDTO}.
     */
    private List<AvailabilityDTO> availabilityProfile;
    /**
     * The username of the user registering the application. This field
     * identifies the user in the system.
     */
    private String userName;
}