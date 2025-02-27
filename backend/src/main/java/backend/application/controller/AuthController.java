package backend.application.controller;

import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final JWTService jwtService;

    public AuthController(AuthService authService) {
        this.authService = authService;
        this.jwtService = new JWTService();
    }

    @PostMapping("/login-user")
    public ResponseEntity<?> login(@RequestBody User credentials, HttpServletResponse response) {
        User user = authService.loginUser(credentials);
        if(user != null) {
            System.out.println("Create token!");
            System.out.println("Username: "+user.getUsername());
            System.out.println("Email: "+user.getEmail());
            String token = JWTService.createToken(
                user.getEmail() != null? user.getEmail() : user.getUsername(),
                user.getRole_id()
            );
            ResponseCookie cookie = JWTService.createResponseCookie(token);
            System.out.println("Login success! Token: "+token);
            response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok("Bearer " + token);
        }
        System.out.println("Login fail!");
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/authTest")
    public ResponseEntity<String> authTest(@CookieValue(value = "token", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token found");
        }
        System.out.println(token);
        try {
            Optional<User> user;
            String username = jwtService.extractUsername(token); // Extract user info from token
            return new ResponseEntity<>(username, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        ResponseCookie logoutCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(true) // CHANGE TO TRUE WHEN DEPLOYING!!!
                .path("/")
                .maxAge(0)  // Expired cookie, so it gets deleted
                .sameSite("None")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, logoutCookie.toString());

        return ResponseEntity.ok("Logged out successfully");
    }

}
