package backend.application.service;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;

// Exceptions
import backend.application.exception.EmailAlreadyRegisteredException;
import backend.application.exception.UsernameAlreadyRegisteredException;
import backend.application.exception.PersonNumberAlreadyRegisteredException;


@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Get all users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // Get a user by ID
    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);
    }

    // Create a new user
    public User createUser(User user) {

        if (userRepository.existsByPnr(user.getPnr())) {
            throw new PersonNumberAlreadyRegisteredException("A user with this person number already exists.");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyRegisteredException("A user with this email already exists.");
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameAlreadyRegisteredException("A user with this username already exists.");
        }
        // If no exceptions Encrypt password and save in database
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        user.setRole_id(2);
        return userRepository.save(user);
    }

    // Delete a user by ID
    public boolean deleteUserById(Integer id) {
        if (userRepository.existsById(Long.valueOf(id))) {
            userRepository.deleteById(Long.valueOf(id));
            return true;  // Return true if user is deleted
        } else {
            return false; // Return false if user doesn't exist
        }
    }

    // Verifies users password
    public boolean verifyUserPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
