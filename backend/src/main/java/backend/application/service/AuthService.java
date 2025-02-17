package backend.application.service;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean validateUser(User userWithCredentials) throws UsernameNotFoundException {
        Optional<User> user = userRepository.getUserByEmail(userWithCredentials.getEmail());
        if(user.isEmpty()) {
            //Change exception type later
            throw new UsernameNotFoundException("Email not found!");
        }
        if(!user.get().getPassword().equals(userWithCredentials.getPassword())) {
            //Change exception type later
            throw new UsernameNotFoundException("Wrong password!");
        }
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
    // Verifies users password
    public boolean verifyUserPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
