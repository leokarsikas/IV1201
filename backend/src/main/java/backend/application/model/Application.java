package backend.application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
/*
@Entity
@Table(name = "application")

 */
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;
    private String surname;
    private String pnr;
    private String email;
    private int rollercoasterSkill;
    private int ticketsellSkill;
    private int someOtherSkill;
    private Date availabilityStart;
    private Date availabilityEnd;



}
