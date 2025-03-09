package backend.application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
 *
 *  This class uses Lombok annotations to automatically generate getter, setter,
 *  no-args constructor, and all-args constructor methods, reducing boilerplate code.
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


    @NotBlank(message = "name is required")
    private String name;


    @NotBlank(message = "surname is required")
    private String surname;

    @Pattern(regexp = "^\\d{8}-\\d{4}$", message = "person number must follow the format YYYYMMDD-XXXX")
    @NotBlank(message = "person number is required")
    private String pnr;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    /**
     * Returns roles of users. A mandatory part of UserDetails
     * and not in use for the moment.
     * @return A list of the role of the user.
     */
    @Override
    @JsonIgnore  // Ignore authorities field during JSON deserialization
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(getRole_id().toString()));
    }

}