package backend.application.model;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

/**
 *  A class for representing an instance of an availability of a user.
 *  An entity mapping to the database table availabilities.
 *
 *  This class uses Lombok annotations to automatically generate getter, setter,
 *  no-args constructor, and all-args constructor methods, reducing boilerplate code.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
@Entity
@Table(name = "availability")
public class Availability {
    /**
     * Unique id of each status and primary key for the table.
     * Auto-generated (incremented) if not provided when saving to database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer availability_id;
    private Integer person_id;
    private Timestamp from_date;
    private Timestamp to_date;

}
