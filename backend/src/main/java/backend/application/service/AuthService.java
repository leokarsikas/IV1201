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

    public boolean validateUser(User userWithCredentials) throws UsernameNotFoundException {
        Optional<User> user = userRepository.getUserByEmail(userWithCredentials.getEmail());
        if(user.isEmpty()) {
            //Change exception type later
            throw new UsernameNotFoundException("Email not found!");
        }
        if(!verifyUserPassword(userWithCredentials.getPassword(), user.get().getPassword())) {
            System.out.println(userWithCredentials.getPassword());
            throw new BadCredentialsException("Wrong password!");
        }
        return true;
    }

    // Verifies users password
    public boolean verifyUserPassword(String rawPassword, String encodedPassword) {
        System.out.println(rawPassword);
        System.out.println(encodedPassword);
        System.out.println(passwordEncoder.encode(rawPassword));
        System.out.println(passwordEncoder.encode(encodedPassword));
        //DON'T FORGET TO RESOLVE THIS ENCRYPTION ISSUE
        return passwordEncoder.matches(rawPassword, encodedPassword) || encodedPassword.matches(rawPassword);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.getUserByEmail(username);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }
        return user.get();
    }
}
