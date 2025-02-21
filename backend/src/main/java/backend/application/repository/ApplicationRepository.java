package backend.application.repository;

import backend.application.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> getApplicationByEmail(String email);
    Optional<Application> getApplicationByUsername(String name);

}

