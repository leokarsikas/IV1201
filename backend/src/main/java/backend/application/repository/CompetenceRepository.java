package backend.application.repository;


import backend.application.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository

public interface CompetenceRepository extends JpaRepository<Competence, Integer>{

    /**
     * Retrieves the competence profile ID for a given person and competence.
     *
     * @param person_id    The ID of the person.
     * @param competence_id The ID of the competence.
     * @return The competence profile ID if found, otherwise null.
     */
    @Query("SELECT c.competence_profile_id FROM Competence c WHERE c.person_id = :person_id AND c.competence_id = :competence_id")
    Integer getCompProfileId(@Param("person_id") Integer person_id, @Param("competence_id") Integer competence_id);

    /**
     * Checks if a person has any associated competences.
     *
     * @param person_id The ID of the person.
     * @return {@code true} if the person has at least one competence, {@code false} otherwise.
     */
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM Competence c WHERE c.person_id = :person_id")
    boolean existsByPersonId(@Param("person_id") Integer person_id);
}