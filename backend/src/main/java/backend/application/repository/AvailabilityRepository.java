package backend.application.repository;

import backend.application.model.Availability;
import backend.application.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AvailabilityRepository extends JpaRepository<Availability, Integer>{
    @Query("SELECT a FROM Availability a WHERE a.person_id =: person_id")
    List<Availability> findByPersonId(@Param(value="person_id") Integer person_id);
}