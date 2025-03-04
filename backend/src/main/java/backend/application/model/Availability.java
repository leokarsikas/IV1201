package backend.application.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods

@Entity
@Table(name = "availability")
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer availability_id;
    private Integer person_id;
    private LocalDate from_date;
    private LocalDate to_date;

}
