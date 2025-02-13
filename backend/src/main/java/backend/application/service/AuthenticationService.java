package backend.application.service;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.springframework.security.authentication.password.CompromisedPasswordException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService implements UserDetailsService {

    private final UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUser(String username, String password) {
        Optional<User> user = userRepository.getUserByUsername(username);;
        if (user == null) {
            throw new UsernameNotFoundException("No such user!");
        }
        if(!user.get().getPassword().equals(password)) {
            //Change exception later
            throw new CompromisedPasswordException("Wrong password!");
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.getUserByUsername(username);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }
        return user.get();
    }
}
