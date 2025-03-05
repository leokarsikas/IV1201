package backend.application.controller;

import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final JWTService jwtService;

    public AuthController(AuthService authService) {
        this.authService = authService;
        this.jwtService = new JWTService();
    }

    @PostMapping("/login-user")
    public ResponseEntity<?> login(@RequestBody User credentials, HttpServletResponse response, HttpServletRequest request) {
        try {
            User user = authService.loginUser(credentials);
            if (user != null) {
                String ipAddress = request.getRemoteAddr();
                logger.info("User '{}' logged in from IP: {}", user.getUsername(), ipAddress);

                String token = JWTService.createToken(
                        user.getEmail() != null ? user.getEmail() : user.getUsername(),
                        user.getRole_id()
                );
                ResponseCookie cookie = JWTService.createResponseCookie(token);
                response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

                return ResponseEntity.ok("Bearer " + token);
            } else {

                logger.info("Login failed - User not found for username: {}", credentials.getEmail());
            }
        } catch (UsernameNotFoundException e) {

            String ipAddress = request.getRemoteAddr();
            logger.warn("Login failed - User not found for username: {} from IP: {} - Reason: {}", credentials.getEmail(), ipAddress, e.getMessage());


            return new ResponseEntity<>(Map.of("error", "User not found"), HttpStatus.UNAUTHORIZED);
        } catch (BadCredentialsException e) {

            String ipAddress = request.getRemoteAddr();
            logger.warn("Login failed for username: {} from IP: {} - Reason: {}", credentials.getEmail(), ipAddress, e.getMessage());

            // Return Unauthorized response
            return new ResponseEntity<>(Map.of("error", "Wrong password"), HttpStatus.UNAUTHORIZED);
        }

        // If no user or error, return Unauthorized response
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/authTest")
    public ResponseEntity<?> authTest(@CookieValue(value = "token", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No token found"));
        }

        try {
            String username = jwtService.extractUsername(token); // Extract username
            int role = jwtService.extractRole(token); // Extract role ID


            Map<String, Object> responseBody = Map.of(
                    "username", username,
                    "role", role
            );

            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response, @CookieValue(value = "token", required = false) String token, HttpServletRequest request) {
        ResponseCookie logoutCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false) // CHANGE TO TRUE WHEN DEPLOYING!!!
                .path("/")
                .maxAge(0)  // Expired cookie, so it gets deleted
                .sameSite("Strict")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, logoutCookie.toString());

        String username = jwtService.extractUsername(token);
        String ipAddress = request.getRemoteAddr();
        logger.info("User '{}' logged out from IP: {}", username, ipAddress);

        return ResponseEntity.ok("Logged out successfully");
    }

}
