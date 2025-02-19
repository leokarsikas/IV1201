package backend.application.controller;

import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login-user")
    public ResponseEntity<String> login(@RequestBody User credentials, HttpServletResponse response) {
        User user = authService.loginUser(credentials);
        if(user != null) {
            System.out.println("Create token!");
            String token = JWTService.createToken(user.getEmail(), user.getRole_id());
            Cookie cookie = JWTService.createCookie(token);
            System.out.println("Login success! Token: "+token);
            response.addCookie(cookie);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        System.out.println("Login fail!");
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        System.out.println("Logging out...");

        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/refresh-token");
        cookie.setMaxAge(0);
        cookie.setSecure(true);

        response.addCookie(cookie);
        return new ResponseEntity<>("Logged out!", HttpStatus.OK);
    }

}
