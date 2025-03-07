package backend.application.service;

import backend.application.DTO.LogInCredentialsDTO;
import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class for authentication-related operations.
 */
@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor for AuthService.
     *
     * @param userRepository   The user repository for database operations.
     * @param passwordEncoder  Encoder for encrypting and verifying passwords.
     */
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Authenticates a user by checking the entered credentials against the database.
     *
     * @param credentials The user credentials containing email or username and password.
     * @return The authenticated User object.
     * @throws UsernameNotFoundException If the user is not found.
     * @throws BadCredentialsException If the password is incorrect.
     */
    public User loginUser(LogInCredentialsDTO credentials) throws UsernameNotFoundException {
        Optional<User> user;
        if(credentials.getEmail().contains("@")) {
            user = userRepository.getUserByEmail(credentials.getEmail());
        } else {
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

    /**
     * Verifies the user's password by comparing the raw and encoded passwords.
     *
     * @param rawPassword     The raw password entered by the user.
     * @param encodedPassword The encoded password stored in the database.
     * @return true if the password matches, false otherwise.
     */
    public boolean verifyUserPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    /**
     * Loads user details by username or email.
     *
     * @param username The username or email of the user.
     * @return The UserDetails object.
     * @throws UsernameNotFoundException If the user is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user;
        if(username.contains("@")) {
            user = userRepository.getUserByEmail(username);
        } else {
            user = userRepository.getUserByUsername(username);
        }

        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }

        return user.get();
    }
}
