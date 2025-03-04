package backend.application.DTO;

import backend.application.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods

public class UserNameDTO {

    private String name;
    private String surname;

    public UserNameDTO(User user) {
        this.name = user.getName();
        this.surname = user.getSurname();
    }
}