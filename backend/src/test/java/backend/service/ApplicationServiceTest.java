package backend.service;

import backend.application.DTO.*;
import backend.application.model.ApplicationStatus;
import backend.application.model.Availability;
import backend.application.model.Competence;
import backend.application.model.User;
import backend.application.repository.ApplicationStatusRepository;
import backend.application.repository.AvailabilityRepository;
import backend.application.repository.CompetenceRepository;
import backend.application.repository.UserRepository;
import backend.application.service.ApplicationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;
import java.sql.Timestamp;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ApplicationServiceTest {

    @Mock
    private AvailabilityRepository availabilityRepository;

    @Mock
    private CompetenceRepository competenceRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ApplicationStatusRepository applicationStatusRepository;

    @InjectMocks
    private ApplicationService applicationService;

    private User user;
    private ApplicationStatus applicationStatus;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setPerson_ID(2);
        user.setName("Test");
        user.setSurname("Test");

        applicationStatus = new ApplicationStatus();
        applicationStatus.setPerson_id(1);
        applicationStatus.setStatus(1);
    }

    @Test
    void testGetUserApplication() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(applicationStatusRepository.findByPersonId(1)).thenReturn(applicationStatus);

        RegAppDTO result = applicationService.getUserApplication(1);

        assertNotNull(result);
        assertEquals("Test", result.getUserNames().getName());
        assertEquals("Test", result.getUserNames().getSurname());
        assertEquals(applicationStatus, result.getStatus());
    }

    @Test
    void testGetUserApplication_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(NullPointerException.class, () -> applicationService.getUserApplication(1));
        assertNotNull(exception);
    }

    @Test
    void testGetOneApplication() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(applicationStatusRepository.findByPersonId(1)).thenReturn(applicationStatus);

        RegAppDTO result = applicationService.getOneApplication(1);

        assertNotNull(result);
        assertEquals("Test", result.getUserNames().getName());
        assertEquals("Test", result.getUserNames().getSurname());
    }

    @Test
    void testSaveNewAvailabilities() {
        Integer personId = 1;
        List<AvailabilityDTO> availabilityDTOList = new ArrayList<>();
        AvailabilityDTO availabilityDTO = new AvailabilityDTO();
        availabilityDTO.setAvailabilityFrom(Timestamp.valueOf("2025-03-09 08:00:00"));
        availabilityDTO.setAvailabilityTo(Timestamp.valueOf("2025-03-09 16:00:00"));
        availabilityDTOList.add(availabilityDTO);

        RegisterApplicationDTO applicationDTO = new RegisterApplicationDTO();
        applicationDTO.setAvailabilityProfile(availabilityDTOList);

        when(availabilityRepository.existsByPersonId(personId)).thenReturn(false);

        applicationService.saveUserApplication(applicationDTO, personId);

        verify(availabilityRepository, times(1)).save(any(Availability.class));
    }

    @Test
    void testSaveNewCompetences() {
        Integer personId = 1;
        List<CompetenceDTO> competenceDTOList = new ArrayList<>();
        CompetenceDTO competenceDTO = new CompetenceDTO();
        competenceDTO.setProfession("Biljettförsäljare");
        competenceDTO.setYears_of_experience("3.5");
        competenceDTOList.add(competenceDTO);

        RegisterApplicationDTO applicationDTO = new RegisterApplicationDTO();
        applicationDTO.setCompetenceProfile(competenceDTOList);

        when(competenceRepository.existsByPersonId(personId)).thenReturn(false);

        applicationService.saveUserApplication(applicationDTO, personId);

        verify(competenceRepository, times(1)).save(any(Competence.class));
    }
}
