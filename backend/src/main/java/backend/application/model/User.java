package backend.application.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

/**
 *  A class for representing an instance of a user.
 *  An entity mapping to the database table person.
 *  Implements the UserDetails interface.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
@Entity
@Table(name = "person")
public class User implements UserDetails {
    /**
     * Unique id of each status and primary key for the table.
     * Auto-generated (incremented) if not provided when saving to database.
     */
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

    /**
     * Returns roles of users. A mandatory part of UserDetails
     * and not in use for the moment.
     * @return A list of the role of the user.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(getRole_id().toString()));
    }

}