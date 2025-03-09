package backend.service;

import backend.application.DTO.LogInCredentialsDTO;
import backend.application.model.User;
import backend.application.repository.UserRepository;
import backend.application.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;  // Mock the UserRepository

    @Mock
    private PasswordEncoder passwordEncoder;  // Mock the PasswordEncoder

    @InjectMocks
    private AuthService authService;  // Inject mocks into AuthService

    private User user;
    private LogInCredentialsDTO validCredentials;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);  // Initialize the mocks

        // Setup test user
        user = new User();
        user.setUsername("user123");
        user.setEmail("user123@example.com");
        user.setPassword("encodedPassword");

        // Setup valid credentials
        validCredentials = new LogInCredentialsDTO();
        validCredentials.setEmail("user123@example.com");
        validCredentials.setPassword("password");

        // Mock the UserRepository behavior
        when(userRepository.getUserByEmail("user123@example.com")).thenReturn(Optional.of(user));
        when(userRepository.getUserByUsername("user123")).thenReturn(Optional.of(user));

        // Mock the PasswordEncoder behavior
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);
    }

    @Test
    void testLoginUser_ValidCredentials_ReturnsUser() {
        User authenticatedUser = authService.loginUser(validCredentials);

        assertEquals("user123", authenticatedUser.getUsername(), "Username should be 'user123'.");
    }

    @Test
    void testLoginUser_UserNotFound_ThrowsUsernameNotFoundException() {
        // Test for user not found
        when(userRepository.getUserByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        LogInCredentialsDTO invalidCredentials = new LogInCredentialsDTO();
        invalidCredentials.setEmail("nonexistent@example.com");
        invalidCredentials.setPassword("password");

        assertThrows(UsernameNotFoundException.class, () -> authService.loginUser(invalidCredentials), "User should not be found.");
    }

    @Test
    void testLoginUser_WrongPassword_ThrowsBadCredentialsException() {
        // Test for wrong password
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(false);

        LogInCredentialsDTO invalidCredentials = new LogInCredentialsDTO();
        invalidCredentials.setEmail("user123@example.com");
        invalidCredentials.setPassword("wrongPassword");

        assertThrows(BadCredentialsException.class, () -> authService.loginUser(invalidCredentials), "Wrong password exception should be thrown.");
    }

    @Test
    void testVerifyUserPassword_CorrectPassword_ReturnsTrue() {
        boolean result = authService.verifyUserPassword("password", "encodedPassword");

        assertTrue(result, "Password should match.");
    }

    @Test
    void testVerifyUserPassword_IncorrectPassword_ReturnsFalse() {
        boolean result = authService.verifyUserPassword("wrongPassword", "encodedPassword");

        assertFalse(result, "Password should not match.");
    }

    @Test
    void testLoadUserByUsername_ValidUser_ReturnsUserDetails() {
        UserDetails userDetails = authService.loadUserByUsername("user123@example.com");

        assertNotNull(userDetails, "UserDetails should be returned.");
        assertEquals("user123", userDetails.getUsername(), "Username should be 'user123'.");
    }

    @Test
    void testLoadUserByUsername_UserNotFound_ThrowsUsernameNotFoundException() {
        // Test for user not found
        when(userRepository.getUserByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> authService.loadUserByUsername("nonexistent@example.com"), "User should not be found.");
    }
}
