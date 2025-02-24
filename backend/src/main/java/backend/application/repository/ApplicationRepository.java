package backend.application.repository;

import backend.application.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ApplicationRepository extends JpaRepository<Competence, Long>{
}
