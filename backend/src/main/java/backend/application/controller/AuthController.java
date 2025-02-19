package backend.application.controller;

import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login-user")
    public ResponseEntity<String> login(@RequestBody User user) {
        System.out.println("login-user");
        System.out.println("username"+user.getUsername());
        //Change and move this logic later. Catch the propagated exception here or pass it on?
        if(authService.validateUser(user)) {
            System.out.println("Create token!");
            String token = JWTService.createToken(user.getEmail());
            System.out.println("Login success! Token: "+token);
            //Cookie cookie = new Cookie("JWT", token);
            //cookie.setHttpOnly(true);
            //cookie.setPath("/");
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        System.out.println("Login fail!");
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
