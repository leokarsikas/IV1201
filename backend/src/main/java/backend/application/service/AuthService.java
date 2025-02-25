package backend.application.service;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
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

    //Checks entered credentials against the database and return the user.
    public User loginUser(User credentials) throws UsernameNotFoundException {
        Optional<User> user;
        if(credentials.getEmail().contains("@")) {
            user = userRepository.getUserByEmail(credentials.getEmail());
        }
        else {
            user = userRepository.getUserByUsername(credentials.getEmail());
        }
        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }
        if(!verifyUserPassword(credentials.getPassword(), user.get().getPassword())) {
            throw new BadCredentialsException("Wrong password!");
        }
        System.out.println("Password verified");
        return user.get();
    }

    // Verifies users password
    public boolean verifyUserPassword(String rawPassword, String encodedPassword) {
        //DON'T FORGET TO RESOLVE THIS ENCRYPTION ISSUE
        return passwordEncoder.matches(rawPassword, encodedPassword) || encodedPassword.matches(rawPassword);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user;
        if(username.contains("@")) {
            user = userRepository.getUserByEmail(username);
        }
        else {
            user = userRepository.getUserByUsername(username);
        }        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }
        return user.get();
    }
}
