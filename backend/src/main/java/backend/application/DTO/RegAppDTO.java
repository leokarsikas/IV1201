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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RegAppDTO {
    private List<Availability> availability;
    private List<Competence> competence;
    private ApplicationStatus status;
    private Integer person_id;
    private UserNameDTO userNames;
    private String name;
    private String surname;

    public RegAppDTO(Application application) {

    }
}