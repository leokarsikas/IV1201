package backend.application.DTO;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object (DTO) representing a user's availability in terms of a time range.
 * This DTO stores the start and end timestamps that define when the user is available.
 *
 * <p>The class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, reducing boilerplate code.</p>
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
public class AvailabilityDTO {
    /**
     * The start timestamp of the user's availability period.
     * This represents when the user becomes available for an event or task.
     */
    private Timestamp availabilityFrom;
    /**
     * The end timestamp of the user's availability period.
     * This represents when the user is no longer available for an event or task.
     */
    private Timestamp availabilityTo;
}
