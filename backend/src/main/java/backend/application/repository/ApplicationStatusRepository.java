package backend.application.repository;

import backend.application.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus,Integer> {
    @Query("SELECT a FROM ApplicationStatus a WHERE a.person_id = :person_id")
    ApplicationStatus findByPersonId(@Param("person_id") Integer person_id);
}