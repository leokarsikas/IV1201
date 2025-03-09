package backend.application.repository;


import backend.application.model.Availability;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;


@Repository

public interface AvailabilityRepository extends JpaRepository<Availability, Integer>{

    /**
     * Retrieves the availability ID for a given person and date range.
     *
     * @param person_id The ID of the person.
     * @param from_date The start date of availability.
     * @param to_date   The end date of availability.
     * @return The availability ID if found, otherwise null.
     */
    @Query("SELECT a.availability_id FROM Availability a WHERE a.person_id = :person_id AND a.from_date = :from_date AND a.to_date = :to_date")
    Integer getAvailabilityId(@Param("person_id") Integer person_id, @Param("from_date") Timestamp from_date, @Param("to_date") Timestamp to_date);

    /**
     * Checks if a person has any recorded availability.
     *
     * @param person_id The ID of the person.
     * @return {@code true} if the person has at least one availability record, {@code false} otherwise.
     */
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM Availability a WHERE a.person_id = :person_id")
    boolean existsByPersonId(@Param("person_id") Integer person_id);
}