package backend.application.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods


public class RegisterApplicationDTO {
    private List<CompetenceDTO> competenceProfile;
    private List<AvailabilityDTO> availabilityProfile;
    private String userName;
}