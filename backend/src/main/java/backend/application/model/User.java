package backend.application.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods

@Entity
@Table(name = "person")
public class User {
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

}