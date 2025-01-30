package backend.application;

//import backend.application.User;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

/*
    @Autowired
    private UserRepository userRepository;
*/

    @GetMapping
    public String test() {
        return "Hello World";
    }

/*
    @GetMapping
    public void createUser(Long id, String name, String email) {
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        // Temp logic to fetch all users
        return userRepository.findAll();
    }
*/
}