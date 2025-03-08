package backend.service;

import backend.application.exception.EmailAlreadyRegisteredException;
import backend.application.exception.PersonNumberAlreadyRegisteredException;
import backend.application.exception.UsernameAlreadyRegisteredException;
import backend.application.model.User;
import backend.application.repository.UserRepository;
import backend.application.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

public class userServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test get all users
    @Test
    public void testGetAllUsers() {
        // Given
        User user = new User();
        user.setUsername("john");
        when(userRepository.findAll()).thenReturn(List.of(user));

        // When
        List<User> users = userService.getAllUsers();

        // Then
        assertFalse(users.isEmpty());
        assertEquals("john", users.get(0).getUsername());
    }

    // Test get user by ID
    @Test
    public void testGetUserById() {
        // Given
        User user = new User();
        user.setUsername("john");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // When
        Optional<User> result = userService.getUserById(1L);

        // Then
        assertTrue(result.isPresent());
        assertEquals("john", result.get().getUsername());
    }

    // Test create user with an existing email
    @Test
    public void testCreateUserWithExistingEmail() {
        // Given
        User user = new User();
        user.setEmail("existing@example.com");
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        // When & Then
        assertThrows(EmailAlreadyRegisteredException.class, () -> userService.createUser(user));
    }

    // Test create user with a new email (valid case)
    @Test
    public void testCreateUserWithValidData() {
        // Given
        User user = new User();
        user.setEmail("new@example.com");
        user.setPassword("password");
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(user.getUsername())).thenReturn(false);
        when(userRepository.existsByPnr(user.getPnr())).thenReturn(false);
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(user)).thenReturn(user);

        // When
        User createdUser = userService.createUser(user);

        // Then
        assertNotNull(createdUser);
        assertEquals("encodedPassword", createdUser.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    // Test get user person ID by username (valid case)
    @Test
    public void testGetUserPersonIdByUsername() {
        // Given
        User user = new User();
        user.setUsername("john");
        user.setPerson_ID(123);
        when(userRepository.getUserByUsername("john")).thenReturn(Optional.of(user));

        // When
        Integer personId = userService.getUserPersonId("john");

        // Then
        assertEquals(123, personId);
    }

    // Test get user person ID by email (valid case)
    @Test
    public void testGetUserPersonIdByEmail() {
        // Given
        User user = new User();
        user.setEmail("john@example.com");
        user.setPerson_ID(123);
        when(userRepository.getUserByEmail("john@example.com")).thenReturn(Optional.of(user));

        // When
        Integer personId = userService.getUserPersonId("john@example.com");

        // Then
        assertEquals(123, personId);
    }

    // Test get user person ID not found
    @Test
    public void testGetUserPersonIdNotFound() {
        // Given
        when(userRepository.getUserByUsername("john")).thenReturn(Optional.empty());

        // When & Then
        assertThrows(UsernameNotFoundException.class, () -> userService.getUserPersonId("john"));
    }

    // Test create user with an existing person number
    @Test
    public void testCreateUserWithExistingPersonNumber() {
        // Given
        User user = new User();
        user.setPnr("1234567890");  // Set a Pnr
        when(userRepository.existsByPnr(user.getPnr())).thenReturn(true);  // Simulate that the Pnr already exists

        // When & Then
        assertThrows(PersonNumberAlreadyRegisteredException.class, () -> userService.createUser(user));
    }

    // Test create user with an existing username
    @Test
    public void testCreateUserWithExistingUsername() {
        // Given
        User user = new User();
        user.setUsername("existingUsername");  // Set an existing username
        when(userRepository.existsByUsername(user.getUsername())).thenReturn(true);  // Simulate that the username already exists

        // When & Then
        assertThrows(UsernameAlreadyRegisteredException.class, () -> userService.createUser(user));
    }
}
