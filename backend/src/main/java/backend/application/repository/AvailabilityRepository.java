package backend.application.repository;

import backend.application.DTO.AvailabilityDTO;
import backend.application.model.Availability;
import backend.application.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository

public interface AvailabilityRepository extends JpaRepository<Availability, Integer>{
    @Query("SELECT a FROM Availability a WHERE a.person_id = :person_id")
    List<Availability> findByPersonId(@Param(value="person_id") Integer person_id);

    @Query("SELECT a.availability_id FROM Availability a WHERE a.person_id = :person_id AND a.from_date = :from_date AND a.to_date = :to_date")
    Integer getAvailabilityId(@Param("person_id") Integer person_id, @Param("from_date") Timestamp from_date, @Param("to_date") Timestamp to_date);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM Availability a WHERE a.person_id = :person_id")
    boolean existsByPersonId(@Param("person_id") Integer person_id);
}