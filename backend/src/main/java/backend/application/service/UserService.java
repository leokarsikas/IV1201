package backend.application.service;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public UserDetails validateUser(User userWithCredentials) throws UsernameNotFoundException {
        Optional<User> user = userRepository.getUserByEmail(userWithCredentials.getEmail());
        if(user.isEmpty()) {
            //Change exception type later
            throw new UsernameNotFoundException("Email not found!");
        }
        if(!user.get().getPassword().equals(userWithCredentials.getPassword())) {
            //Change exception type later
            throw new UsernameNotFoundException("Wrong password!");
        }
        return user.get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
