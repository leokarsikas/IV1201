package backend.application.repository;

import backend.application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPnr(String pnr);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}

