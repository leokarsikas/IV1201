package backend.application.DTO;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods


public class AvailabilityDTO {
    private Timestamp availabilityFrom;
    private Timestamp availabilityTo;
}
