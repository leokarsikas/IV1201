package backend.application.repository;

import backend.application.model.Availability;
import backend.application.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository

public interface CompetenceRepository extends JpaRepository<Competence, Integer>{
    @Query("SELECT c FROM Competence c WHERE c.person_id = :person_id")
    List<Competence> findByPersonId(@Param("person_id") Integer person_id);

    @Query("SELECT c.competence_profile_id FROM Competence c WHERE c.person_id = :person_id AND c.competence_id = :competence_id")
    Integer getCompetenceProfileId(@Param("person_id") Integer person_id, @Param("competence_id") Integer competence_id);

    @Query("SELECT c.competence_profile_id FROM Competence c WHERE c.person_id = :person_id AND c.competence_id = :competence_id")
    Integer getCompProfileId(@Param("person_id") Integer person_id, @Param("competence_id") Integer competence_id);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM Competence c WHERE c.person_id = :person_id")
    boolean existsByPersonId(@Param("person_id") Integer person_id);
}