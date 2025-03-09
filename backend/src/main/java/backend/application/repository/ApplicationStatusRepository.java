package backend.application.repository;

import backend.application.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import backend.application.DTO.ApplicationDTO;

import java.util.List;

@Repository
public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Integer> {
    /**
     * Retrieves a list of all applications, including the application status, person ID, name and surname.
     * This query uses a projection to return a customized ApplicationDTO containing the necessary fields.
     *
     * @return A list of ApplicationDTO objects, each representing an application with relevant details.
     */
    @Query("SELECT new backend.application.DTO.ApplicationDTO(a.status, p.person_ID, p.name, p.surname) " +
            "FROM User p INNER JOIN ApplicationStatus a ON p.person_ID = a.person_id")
    List<ApplicationDTO> findAllApplications();

    /**
     * Retrieves the ApplicationStatus associated with a given person ID.
     *
     * @param person_id The ID of the person whose application status is to be fetched.
     * @return The ApplicationStatus object associated with the specified person ID.
     * @throws ""javax.persistence.EntityNotFoundException" if no application status is found for the given person ID.
     */
    @Query("SELECT a FROM ApplicationStatus a WHERE a.person_id = :person_id")
    ApplicationStatus findByPersonId(@Param("person_id") Integer person_id);

    /**
     * Checks if an application status exists for a given person ID.
     * This query returns a boolean value indicating whether an ApplicationStatus record exists for the specified person ID.
     *
     * @param person_id The ID of the person to check for an existing application status.
     * @return true if an application status exists for the person, otherwise false.
     */
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM ApplicationStatus a WHERE a.person_id = :person_id")
    boolean existsByPersonId(@Param("person_id") Integer person_id);
}