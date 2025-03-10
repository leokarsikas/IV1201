package backend.controller;

import backend.application.DTO.ApplicationDTO;
import backend.application.DTO.RegAppDTO;
import backend.application.DTO.RegisterApplicationDTO;
import backend.application.controller.ApplicationController;
import backend.application.exception.ApplicationNotFoundException;
import backend.application.model.ApplicationStatus;
import backend.application.service.ApplicationService;
import backend.application.service.AuthService;
import backend.application.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


public class ApplicationControllerTest {

    @Mock
    private ApplicationService applicationService;

    @Mock
    private AuthService authService;  // Added missing mock

    @Mock
    private UserService userService;  // Added missing mock

    private ApplicationController applicationController;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        applicationController = new ApplicationController(applicationService, authService, userService);
        mockMvc = MockMvcBuilders.standaloneSetup(applicationController).build();
    }

    @Test
    public void testGetApplicationStatusById() throws Exception {
        // Given
        RegAppDTO application = new RegAppDTO();
        application.setName("Test Test");

        ApplicationStatus status = new ApplicationStatus();
        status.setStatus(2);
        application.setStatus(status);
        application.setPerson_id(1);

        when(applicationService.getUserApplication(1)).thenReturn(application);

        // When & Then
        mockMvc.perform(get("/api/user/get-application")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Test"))
                .andExpect(jsonPath("$.status.status").value(2));
    }
    @Test
    public void testSendApplication() throws Exception {

        // Given
        RegisterApplicationDTO appDTO = new RegisterApplicationDTO();
        appDTO.setUserName("TestUser");

        when(userService.getUserPersonId("TestUser")).thenReturn(1); // Mock user ID retrieval
        doNothing().when(applicationService).saveUserApplication(any(RegisterApplicationDTO.class), anyInt()); // Mock void method

        // When & Then
        mockMvc.perform(post("/api/send-application")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(appDTO))) // Convert DTO to JSON
                .andExpect(status().isCreated()) // Expect HTTP 201 Created
                .andExpect(jsonPath("$.userName").value("TestUser")); // Validate response body
    }

    @Test
    public void testGetAllApplications_WhenApplicationExists_ShouldReturnApplication() throws Exception {
        // Given
        ApplicationDTO application = new ApplicationDTO(); // Use ApplicationDTO instead of RegAppDTO
        application.setName("Test Application");

        // Mock the service to return a list with the application
        List<ApplicationDTO> applications = new ArrayList<>();
        applications.add(application);

        when(applicationService.getAllApplications()).thenReturn(applications); // Mocking the service to return a list

        // When & Then
        mockMvc.perform(get("/api/admin/get-all-applications")
                        .param("personID", "1") // Passing personID as a request param
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Expecting HTTP 200 OK
                .andExpect(jsonPath("$[0].name").value("Test Application")); // Checking the name of the first application
    }


}


