package backend.repository;

import backend.application.model.User;
import backend.application.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize the mocks
    }

    // Test for retrieving a user by email
    @Test
    public void testGetUserByEmail() {
        // Given
        String email = "test@example.com";
        User expectedUser = new User();
        expectedUser.setEmail(email);

        when(userRepository.getUserByEmail(email)).thenReturn(Optional.of(expectedUser));

        // When
        Optional<User> user = userRepository.getUserByEmail(email);

        // Then
        assertTrue(user.isPresent(), "User should be present");
        assertEquals(email, user.get().getEmail(), "User email should match the expected value");

        // Verify that the method was called with the correct email
        verify(userRepository, times(1)).getUserByEmail(email);
    }

    // Test for retrieving a user by username
    @Test
    public void testGetUserByUsername() {
        // Given
        String username = "testuser";
        User expectedUser = new User();
        expectedUser.setUsername(username);

        when(userRepository.getUserByUsername(username)).thenReturn(Optional.of(expectedUser));

        // When
        Optional<User> user = userRepository.getUserByUsername(username);

        // Then
        assertTrue(user.isPresent(), "User should be present");
        assertEquals(username, user.get().getUsername(), "User username should match the expected value");

        // Verify that the method was called with the correct username
        verify(userRepository, times(1)).getUserByUsername(username);
    }

    // Test for checking if a user exists by PNR
    @Test
    public void testExistsByPnr() {
        // Given
        String pnr = "1234567890";
        when(userRepository.existsByPnr(pnr)).thenReturn(true);

        // When
        boolean exists = userRepository.existsByPnr(pnr);

        // Then
        assertTrue(exists, "User should exist with the given PNR");

        // Verify that the method was called once with the correct PNR
        verify(userRepository, times(1)).existsByPnr(pnr);
    }

    // Test for checking if a user exists by email
    @Test
    public void testExistsByEmail() {
        // Given
        String email = "test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        // When
        boolean exists = userRepository.existsByEmail(email);

        // Then
        assertTrue(exists, "User should exist with the given email");

        // Verify that the method was called once with the correct email
        verify(userRepository, times(1)).existsByEmail(email);
    }

    // Test for checking if a user exists by username
    @Test
    public void testExistsByUsername() {
        // Given
        String username = "testuser";
        when(userRepository.existsByUsername(username)).thenReturn(true);

        // When
        boolean exists = userRepository.existsByUsername(username);

        // Then
        assertTrue(exists, "User should exist with the given username");

        // Verify that the method was called once with the correct username
        verify(userRepository, times(1)).existsByUsername(username);
    }

    // Test for checking if a user does not exist by email
    @Test
    public void testExistsByEmailWhenNotExists() {
        // Given
        String email = "nonexistent@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(false);

        // When
        boolean exists = userRepository.existsByEmail(email);

        // Then
        assertFalse(exists, "User should not exist with the given email");

        // Verify that the method was called once with the correct email
        verify(userRepository, times(1)).existsByEmail(email);
    }

    // Test for checking if a user does not exist by username
    @Test
    public void testExistsByUsernameWhenNotExists() {
        // Given
        String username = "nonexistentuser";
        when(userRepository.existsByUsername(username)).thenReturn(false);

        // When
        boolean exists = userRepository.existsByUsername(username);

        // Then
        assertFalse(exists, "User should not exist with the given username");

        // Verify that the method was called once with the correct username
        verify(userRepository, times(1)).existsByUsername(username);
    }
}
