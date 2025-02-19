package backend.application;

import backend.application.model.User;
//import org.springframework.beans.factory.annotation.Autowired;
import backend.application.service.JWTService;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

//check the right port number for the frontend

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api")
public class MyController {

    @GetMapping("/")
    public Repsonse hello() {
        return new Repsonse("Hello World from the SpringBoot backend!", 200);
    }

    public static class Repsonse {
        private String message;
        private int status;

        public Repsonse(String message, int status) {
            this.message = message;
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public int getStatus() {
            return status;
        }
    }

    @PostMapping("/users")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        System.out.println("Received user data: " + user);

        return ResponseEntity.ok("User registered successfully");
    }
}
