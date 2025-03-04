package backend.application.repository;

import backend.application.model.Availability;
import backend.application.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CompetenceRepository extends JpaRepository<Competence, Integer>{
    @Query("SELECT c FROM Competence c WHERE c.person_id = :person_id")
    List<Competence> findByPersonId(@Param("person_id") Integer person_id);
}
