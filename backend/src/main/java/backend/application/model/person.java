package backend.application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods

@Entity
@Table(name = "person")
public class person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer person_ID;
    private Integer role_id;
    private String name;
    private String surname;
    private String pnr;
    private String email;
    private String username;
    private String password;

    public Integer getPerson_ID() {
        return person_ID;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

}