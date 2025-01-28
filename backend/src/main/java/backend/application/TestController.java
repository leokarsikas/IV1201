package backend.application;

import org.apache.catalina.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping
    public String test() {
        return "Hello World";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        // Logic to fetch all users
        return null;
    }
}