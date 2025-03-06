package backend.application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *  A class for representing the status of applications.
 *  An entity mapping to the database table application_status.
 *
 *  This class uses Lombok annotations to automatically generate getter, setter,
 *  no-args constructor, and all-args constructor methods, reducing boilerplate code.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
@Entity
@Table(name = "application_status")
public class ApplicationStatus {
    /**
     * Unique id of each status and primary key for the table.
     * Auto-generated (incremented) if not provided when saving to database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer application_status_id;
    private Integer person_id;
    private Integer status;
}