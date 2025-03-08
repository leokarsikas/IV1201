package backend.application.service;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;

// Exceptions
import backend.application.exception.EmailAlreadyRegisteredException;
import backend.application.exception.UsernameAlreadyRegisteredException;
import backend.application.exception.PersonNumberAlreadyRegisteredException;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for handling user-related operations.
 */
@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor for UserService.
     *
     * @param userRepository   The user repository for database operations.
     * @param passwordEncoder  Encoder for encrypting passwords.
     */
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all users from the database.
     *
     * @return List of all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id The ID of the user.
     * @return An Optional containing the user if found, otherwise empty.
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Creates a new user after performing necessary validations.
     *
     * @param user The user object to be created.
     * @return The created user object.
     * @throws PersonNumberAlreadyRegisteredException If the personal number is already registered.
     * @throws EmailAlreadyRegisteredException       If the email is already registered.
     * @throws UsernameAlreadyRegisteredException    If the username is already registered.
     */
    @Transactional
    public User createUser(User user) {
        /*System.out.println(user);*/
        if (userRepository.existsByPnr(user.getPnr())) {
            throw new PersonNumberAlreadyRegisteredException("A user with this person number already exists.");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyRegisteredException("A user with this email already exists.");
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameAlreadyRegisteredException("A user with this username already exists.");
        }

        // Encrypt password and save user to database
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        user.setRole_id(2);
        return userRepository.save(user);
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id The ID of the user to delete.
     * @return true if the user was deleted, false if the user was not found.
     */
    public boolean deleteUserById(Integer id) {
        if (userRepository.existsById(Long.valueOf(id))) {
            userRepository.deleteById(Long.valueOf(id));
            return true;
        } else {
            return false;
        }
    }

    /**
     * Updates the password for a given user.
     *
     * @param userId      The ID of the user whose password is being updated.
     * @param newPassword The new password to be set.
     * @return true if the password was updated successfully, false otherwise.
     */
    public boolean updatePassword(Integer userId, String newPassword) {
        if (userRepository.existsById(Long.valueOf(userId))) {
            User user = userRepository.findById(Long.valueOf(userId)).orElse(null);
            if (user != null) {
                user.setPassword(newPassword);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    /**
     * Retrieves the person ID of a user based on their username or email.
     *
     * @param username The username or email of the user.
     * @return The person ID of the user.
     * @throws UsernameNotFoundException If the user is not found.
     */
    public Integer getUserPersonId(String username) {
        Optional<User> user;
        if(username.contains("@")) {
            user = userRepository.getUserByEmail(username);
        } else {
            user = userRepository.getUserByUsername(username);
        }

        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }
        return user.get().getPerson_ID();
    }
}

