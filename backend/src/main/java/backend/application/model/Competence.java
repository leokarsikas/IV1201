package backend.application.model;

import jakarta.persistence.*;
import lombok.*;

/**
 *  A class for representing an instance of a competency of a user.
 *  An entity mapping to the database table competence_profile.
 *
 *  This class uses Lombok annotations to automatically generate getter, setter,
 *  no-args constructor, and all-args constructor methods, reducing boilerplate code.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
@Entity
@Table(name = "competence_profile")
public class Competence {
    /**
     * Unique id of each status and primary key for the table.
     * Auto-generated (incremented) if not provided when saving to database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer competence_profile_id;
    private Integer person_id;
    private Integer competence_id;
    private double years_of_experience;
}
