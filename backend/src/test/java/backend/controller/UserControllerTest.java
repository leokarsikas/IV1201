package backend.controller;

import backend.application.controller.UserController;
import backend.application.exception.EmailAlreadyRegisteredException;
import backend.application.exception.PersonNumberAlreadyRegisteredException;
import backend.application.exception.UsernameAlreadyRegisteredException;
import backend.application.model.User;
import backend.application.service.UserService;
import backend.model.UserTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testRegisterUserValid() throws Exception {
        User user = new UserTest();
        user.setUsername("testuser");
        user.setEmail("newuser@example.com");
        user.setPnr("12345678-1234");
        user.setPassword("123123123");
        user.setName("Test");
        user.setSurname("Testsson");
        user.setPerson_ID(1);
        user.setRole_id(2);

        when(userService.createUser(any(User.class))).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register-user")
                        .content(objectMapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("newuser@example.com"))
                .andExpect(jsonPath("$.pnr").value("12345678-1234"))
                .andExpect(jsonPath("$.name").value("Test"))
                .andExpect(jsonPath("$.surname").value("Testsson"))
                .andExpect(jsonPath("$.person_ID").value(1))
                .andExpect(jsonPath("$.role_id").value(2));
    }

    @Test
    public void testRegisterUser_DuplicateEmail() throws Exception {
        User user = new UserTest();

        user.setUsername("testuser");
        user.setEmail("duplicate@example.com");
        user.setPnr("12345678-1234");
        user.setPassword("123123123");
        user.setName("Test");
        user.setSurname("Testsson");
        user.setPerson_ID(1);
        user.setRole_id(2);

        when(userService.createUser(any(User.class)))
                .thenThrow(new EmailAlreadyRegisteredException("Email is already registered."));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register-user")
                        .content(objectMapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email is already registered."));
    }

    @Test
    public void testRegisterUser_DuplicateUsername() throws Exception {
        User user = new UserTest();

        user.setUsername("duplicatetestuser");
        user.setEmail("newuser@example.com");
        user.setPnr("12345678-1234");
        user.setPassword("123123123");
        user.setName("Test");
        user.setSurname("Testsson");
        user.setPerson_ID(1);
        user.setRole_id(2);

        when(userService.createUser(any(User.class)))
                .thenThrow(new UsernameAlreadyRegisteredException("Username is already registered."));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register-user")
                        .content(objectMapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Username is already registered."));
    }

    @Test
    public void testRegisterUser_DuplicatePnr() throws Exception {
        User user = new UserTest();

        user.setUsername("testuser");
        user.setEmail("newuser@example.com");
        user.setPnr("12345678-1234");
        user.setPassword("123123123");
        user.setName("Test");
        user.setSurname("Testsson");
        user.setPerson_ID(1);
        user.setRole_id(2);

        when(userService.createUser(any(User.class)))
                .thenThrow(new PersonNumberAlreadyRegisteredException("Person number is already registered."));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register-user")
                        .content(objectMapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Person number is already registered."));
    }

    @Test
    public void testRegisterUser_InternalServerError() throws Exception {
        User user = new UserTest();

        user.setUsername("testuser");
        user.setEmail("newuser@example.com");
        user.setPnr("12345678-1234");
        user.setPassword("123123123");
        user.setName("Test");
        user.setSurname("Testsson");
        user.setPerson_ID(1);
        user.setRole_id(2);

        when(userService.createUser(any(User.class)))
                .thenThrow(new RuntimeException("Unexpected error occurred."));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register-user")
                        .content(objectMapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.error").value("Internal Server Error"))
                .andExpect(jsonPath("$.message").value("Something went wrong."));

    }

    @Test
    public void testDeleteUser_Success() throws Exception {
        int userId = 1;
        when(userService.deleteUserById(userId)).thenReturn(true);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/delete-user/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(content().string("User deleted successfully."));
    }

    @Test
    public void testDeleteUser_UserNotFound() throws Exception {
        int userId = 1;
        when(userService.deleteUserById(userId)).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/delete-user/{id}", userId))
                .andExpect(status().isNotFound())
                .andExpect(content().string("User not found."));
    }
}


