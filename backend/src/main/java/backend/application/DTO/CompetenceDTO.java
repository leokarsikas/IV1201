package backend.application.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object (DTO) representing a user's competence or profession-related information.
 * This DTO holds details about a user's profession and the years of experience they have in that field.
 *
 * <p>This class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, reducing boilerplate code.</p>
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods

public class CompetenceDTO {
    /**
     * The profession or job title of the user.
     * This field represents the user's area of expertise or occupation.
     */
    @NotNull(message = "Profession cannot be null")
    private String profession;
    /**
     * The number of years of experience the user has in their profession.
     * This field represents how long the user has been working in the given profession.
     */
    @NotNull(message = "Years of experience cannot be null")
    private String years_of_experience;
}
