package backend.application.DTO;

import backend.application.Application;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object (DTO) representing an application with basic details such as status,
 * person ID, and user's name and surname. This DTO is typically used to transfer application-related data
 * across different layers of the application, such as in API responses.
 *
 * <p>This class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, reducing boilerplate code.</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {

    /**
     * The status of the application. Typically represented by an integer value indicating the current
     * state of the application (e.g., pending, approved, rejected).
     */
    private Integer status;
    /**
     * The unique identifier for the person associated with the application.
     * This ID represents the individual who submitted the application.
     */
    private Integer person_id;
    /**
     * The first name of the person who submitted the application.
     * This field represents the user's given name.
     */
    private String name;
    /**
     * The surname (last name) of the person who submitted the application.
     * This field represents the user's family name.
     */
    private String surname;

    /**
     * Constructs a new {@code ApplicationDTO} from the provided {@link Application} object.
     * This constructor initializes the DTO using the relevant details from the {@code Application} object,
     * such as status, person ID, name, and surname.
     *
     * @param application the {@link Application} object from which to extract data
     */
    public ApplicationDTO(Application application) {

    }
}