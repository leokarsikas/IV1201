package backend.application.controller;

import backend.application.DTO.LogInCredentialsDTO;
import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;

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

/**
 * Controller class responsible for handling authentication-related HTTP requests.
 * This includes logging in, logging out, and testing authentication.
 *
 * <p>The controller interacts with the {@link AuthService} for handling user login and the
 * {@link JWTService} for managing JSON Web Tokens (JWTs).</p>
 */
@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final JWTService jwtService;


    /**
     * Constructs a new {@code AuthController} with the specified {@link AuthService} and {@link JWTService}.
     *
     * @param authService the service layer to handle user authentication
     */
    public AuthController(AuthService authService, JWTService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    /**
     * Endpoint for logging in a user.
     * <p>This method processes a login request by verifying the user's credentials and generating a JWT token
     * if the authentication is successful. The JWT token is returned as a response and stored in a cookie.</p>
     *
     * @param credentials the user credentials (username/email and password)
     * @param response the HTTP response to send the JWT token in the cookie
     * @param request the HTTP request to log the user's IP address
     * @return a {@link ResponseEntity} with the JWT token if successful, or an error message if login fails
     */
    @PostMapping("/login-user")
    public ResponseEntity<?> login(@RequestBody LogInCredentialsDTO credentials, HttpServletResponse response, HttpServletRequest request) {
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
            return new ResponseEntity<>(Map.of("error", "Wrong username or Password"), HttpStatus.UNAUTHORIZED);
        }

        // If no user or error, return Unauthorized response
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Endpoint for testing the authentication of a user.
     * <p>This method checks if a valid JWT token is present in the request cookies, extracts the username and role
     * from the token, and returns them in the response. If the token is invalid or missing, an unauthorized response
     * is returned.</p>
     *
     * @param token the JWT token passed in the request cookies
     * @return a {@link ResponseEntity} with user information (username and role) if the token is valid,
     *         or an error message if the token is invalid or missing
     */
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

    /**
     * Endpoint for logging out a user.
     * <p>This method logs out the user by invalidating the JWT token, removing the token from the response cookies,
     * and logging the logout action with the user's IP address. It sends a response indicating the successful logout.</p>
     *
     * @param response the HTTP response to set the logout cookie (with expired token)
     * @param token the JWT token passed in the request cookies, used to extract the username
     * @param request the HTTP request to log the user's IP address for the logout action
     * @return a {@link ResponseEntity} indicating the success of the logout operation
     */
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
