package backend.model;

import backend.application.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collection;
import java.util.List;

/**
 * This classed is only used for testing since if @JsonIgnore is used on main class the rest of
 * the application can´t parse for given authorities as intended.
 */

public class UserTest extends User {

   /* @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }*/
}
