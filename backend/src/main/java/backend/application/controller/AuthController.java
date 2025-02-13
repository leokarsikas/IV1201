package backend.application.controller;

import backend.application.model.User;
import backend.application.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/secured")
    public String secured(){
        return "This page is open only when logged in.";
    }

    @GetMapping("/open")
    public ResponseEntity<String> open() {
        return ResponseEntity.ok("This page is open for all.");
    }

    @PostMapping("/login-user")
    public ResponseEntity<String> login(@RequestBody User user) {
        //Change and move this logic later
        if(userService.validateUser(user) != null) {
            return ResponseEntity.ok("Success! This will be a token later.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
