package backend.application.controller;

import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;
import backend.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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
        if(authService.validateUser(user)) {
            String token = JWTService.createToken(user);
            System.out.println(token);
            return ResponseEntity.ok("Success! JWT token is: \n"+token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
