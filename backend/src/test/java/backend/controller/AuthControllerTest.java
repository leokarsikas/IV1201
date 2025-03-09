package backend.controller;


import backend.application.DTO.LogInCredentialsDTO;
import backend.application.controller.AuthController;
import backend.application.model.User;
import backend.application.service.AuthService;
import backend.application.service.JWTService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.crypto.SecretKey;

import java.util.Date;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;
import static org.springframework.test.util.AssertionErrors.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;



public class AuthControllerTest {

    @Mock
    private AuthService authService; // Mock the AuthService

    @Mock
    private JWTService jwtService; // Mock the JWTService

    @InjectMocks
    private AuthController authController; // Inject the mock service into the controller


    @Autowired
    private MockMvc mockMvc; // MockMvc to simulate HTTP requests

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);  // Initialize mocks
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();

    }

    // Test: Successful Login
    @Test
    public void testLoginUserValidCredentials() throws Exception {
        // Given
        LogInCredentialsDTO credentials = new LogInCredentialsDTO();
        credentials.setEmail("user@example.com");
        credentials.setPassword("password");

        User user = new User();
        user.setUsername("testuser");
        user.setEmail("user@example.com");
        user.setRole_id(1);

        when(authService.loginUser(any(LogInCredentialsDTO.class))).thenReturn(user);

        // When & Then
        mockMvc.perform(post("/api/login-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\": \"user@example.com\", \"password\": \"password\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.startsWith("Bearer ")))  // Check for Bearer token
                .andExpect(header().string(HttpHeaders.SET_COOKIE, org.hamcrest.Matchers.containsString("token")));  // Check for token in cookie
    }

    @Test
    public void testLoginUserUserNotFound() throws Exception {
        // Given
        LogInCredentialsDTO credentials = new LogInCredentialsDTO();
        credentials.setEmail("nonexistent@example.com");
        credentials.setPassword("password");

        // Mock the service to throw UsernameNotFoundException
        when(authService.loginUser(any(LogInCredentialsDTO.class))).thenThrow(new UsernameNotFoundException("User not found!"));

        // When & Then: Perform the login request
        MvcResult result = mockMvc.perform(post("/api/login-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")  // Ensure proper character encoding
                        .content("{\"email\": \"nonexistent@example.com\", \"password\": \"password\"}"))
                .andExpect(status().isUnauthorized())  // Expect 401 Unauthorized status
                .andReturn();  // Capture the result for further inspection

        // Get the response content as String
        String responseContent = result.getResponse().getContentAsString();
        System.out.println("Response Body: " + responseContent);  // Log the response body

        // Check that the response body contains the expected error message
        assertTrue("Response does not contain the expected error message",
                responseContent.contains("\"error\":\"User not found\""));
    }

    @Test
    public void testLoginUserWrongPassword() throws Exception {
        // Given
        LogInCredentialsDTO credentials = new LogInCredentialsDTO();
        credentials.setEmail("existing@example.com");
        credentials.setPassword("wrongpassword");

        // Mock the service to throw BadCredentialsException for wrong password
        when(authService.loginUser(any(LogInCredentialsDTO.class))).thenThrow(new BadCredentialsException("Wrong password"));

        // When & Then: Perform the login request
        MvcResult result = mockMvc.perform(post("/api/login-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")  // Ensure proper character encoding
                        .content("{\"email\": \"existing@example.com\", \"password\": \"wrongpassword\"}"))
                .andExpect(status().isUnauthorized())  // Expect 401 Unauthorized status
                .andReturn();  // Capture the result for further inspection

        // Get the response content as String
        String responseContent = result.getResponse().getContentAsString();
        System.out.println("Response Body: " + responseContent);  // Log the response body

        // Check that the response body contains the expected error message for wrong password
        assertTrue("Response does not contain the expected error message",
                responseContent.contains("\"error\":\"Wrong password\""));
    }

    @Test
    public void testLoginUserUnauthorized() throws Exception {
        // Given
        LogInCredentialsDTO credentials = new LogInCredentialsDTO();
        credentials.setEmail("nonexistent@example.com");
        credentials.setPassword("password");

        // Mock the service to return null (no user found)
        when(authService.loginUser(any(LogInCredentialsDTO.class))).thenReturn(null);

        // When & Then: Perform the login request
        MvcResult result = mockMvc.perform(post("/api/login-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")  // Ensure proper character encoding
                        .content("{\"email\": \"nonexistent@example.com\", \"password\": \"password\"}"))
                .andExpect(status().isUnauthorized())  // Expect 401 Unauthorized status
                .andReturn();  // Capture the result for further inspection

        // Get the response content as String
        String responseContent = result.getResponse().getContentAsString();
        System.out.println("Response Body: " + responseContent);  // Log the response body

        // Since it's a generic Unauthorized case, no error message is expected in the response body
        assertTrue("Response body should be empty for unauthorized requests", responseContent.isEmpty());
    }

    @Test
    public void testAuthTestNoToken() throws Exception {
        // When & Then: Perform the authTest request without the token cookie
        mockMvc.perform(get("/api/authTest"))
                .andExpect(status().isUnauthorized())  // Expect 401 Unauthorized status
                .andExpect(jsonPath("$.error").value("No token found"));  // Expect the error message in the response body
    }

    @Test
    public void testAuthTestInvalidToken() throws Exception {
        // Given: Invalid token
        String invalidToken = "invalid.token.here";

        // Mock the jwtService to throw an exception when extracting username and role
        when(jwtService.extractUsername(invalidToken)).thenThrow(new RuntimeException("Invalid token"));
        when(jwtService.extractRole(invalidToken)).thenThrow(new RuntimeException("Invalid token"));

        // When & Then: Perform the authTest request with an invalid token
        mockMvc.perform(MockMvcRequestBuilders.get("/api/authTest")
                        .cookie(new org.springframework.mock.web.MockCookie("token", invalidToken)))  // Set the invalid token in the cookie
                .andExpect(status().isUnauthorized())  // Expect 401 Unauthorized status
                .andExpect(jsonPath("$.error").value("Invalid token"));  // Expect the error message in the response body
    }


    @Test
    public void testAuthTestValidToken() throws Exception {
        // Given: Create a valid JWT token using the mock JWTService's createToken method
        String validToken = jwtService.createToken("validUser", 1);  // Use the mocked jwtService

        // Mock the jwtService to return the correct username and role from the token
        when(jwtService.extractUsername(validToken)).thenReturn("validUser");
        when(jwtService.extractRole(validToken)).thenReturn(1);

        // When & Then: Perform the authTest request with the valid token
        mockMvc.perform(MockMvcRequestBuilders.get("/api/authTest")
                        .cookie(new org.springframework.mock.web.MockCookie("token", validToken)))  // Set the cookie in the request
                .andExpect(status().isOk())  // Expect 200 OK status
                .andExpect(jsonPath("$.username").value("validUser"))  // Expect the username in the response
                .andExpect(jsonPath("$.role").value(1));  // Expect the role ID in the response
    }

}


