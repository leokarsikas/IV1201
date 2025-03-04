package backend.application.repository;

import backend.application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getUserByEmail(String email);
    Optional<User> getUserByUsername(String name);
    boolean existsByPnr(String pnr);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    @Query("SELECT u.person_ID FROM User u WHERE u.role_id = 2")
    List<Integer> findAllIdsByRoleIdTwo();
}

