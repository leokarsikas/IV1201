package backend.application.DTO;

import backend.application.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object (DTO) that represents a user's name and surname.
 * This class is used to transfer only the relevant user information (name and surname)
 * in cases where the full User object is not required.
 *
 * <p>The class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, reducing boilerplate code.</p>
 *
 * @see backend.application.model.User
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
public class UserNameDTO {

    private String name;
    private String surname;

    /**
     * Constructs a new {@code UserNameDTO} from the given {@link User} object.
     * This constructor initializes the name and surname fields of the DTO
     * using the corresponding values from the {@code User} object.
     *
     * @param user the {@link User} object from which to extract the name and surname
     */
    public UserNameDTO(User user) {
        this.name = user.getName();
        this.surname = user.getSurname();
    }
}