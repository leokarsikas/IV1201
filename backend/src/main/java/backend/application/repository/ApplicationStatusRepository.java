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

    @Query("SELECT new backend.application.DTO.ApplicationDTO(a.status, p.person_ID, p.name, p.surname) " +
            "FROM User p INNER JOIN ApplicationStatus a ON p.person_ID = a.person_id")
    List<ApplicationDTO> findAllApplications();

    @Query("SELECT a FROM ApplicationStatus a WHERE a.person_id = :person_id")
    ApplicationStatus findByPersonId(@Param("person_id") Integer person_id);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM ApplicationStatus a WHERE a.person_id = :person_id")
    boolean existsByPersonId(@Param("person_id") Integer person_id);
}