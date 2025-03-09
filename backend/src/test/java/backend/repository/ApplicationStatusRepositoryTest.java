package backend.repository;

import backend.application.model.ApplicationStatus;

import backend.application.repository.ApplicationStatusRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ApplicationStatusRepositoryTest {

    @Mock
    private ApplicationStatusRepository applicationStatusRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize the mocks
    }

    // Test: Retrieve ApplicationStatus by ID
    @Test
    public void testFindById() {
        // Given
        ApplicationStatus applicationStatus = new ApplicationStatus();
        applicationStatus.setApplication_status_id(1);
        applicationStatus.setStatus(2);
        when(applicationStatusRepository.findById(1)).thenReturn(Optional.of(applicationStatus));

        // When
        Optional<ApplicationStatus> result = applicationStatusRepository.findById(1);

        // Then
        assertTrue(result.isPresent(), "ApplicationStatus should be present");
        assertEquals(2, result.get().getStatus(), "The status should be '2'");
    }

    // Test: Retrieve all ApplicationStatus entries
    @Test
    public void testFindAll() {
        // Given
        ApplicationStatus applicationStatus1 = new ApplicationStatus();
        applicationStatus1.setApplication_status_id(1);
        applicationStatus1.setStatus(2);

        ApplicationStatus applicationStatus2 = new ApplicationStatus();
        applicationStatus2.setApplication_status_id(2);
        applicationStatus2.setStatus(3);

        when(applicationStatusRepository.findAll()).thenReturn(List.of(applicationStatus1, applicationStatus2));

        // When
        List<ApplicationStatus> result = applicationStatusRepository.findAll();

        // Then
        assertEquals(2, result.size(), "There should be 2 application statuses");
        assertEquals(2, result.get(0).getStatus(), "The first status should be '2'");
        assertEquals(3, result.get(1).getStatus(), "The second status should be '3'");
    }

    // Test: Save ApplicationStatus
    @Test
    public void testSave() {
        // Given
        ApplicationStatus applicationStatus = new ApplicationStatus();
        applicationStatus.setApplication_status_id(1);
        applicationStatus.setStatus(2);
        when(applicationStatusRepository.save(applicationStatus)).thenReturn(applicationStatus);

        // When
        ApplicationStatus savedStatus = applicationStatusRepository.save(applicationStatus);

        // Then
        assertNotNull(savedStatus, "The saved ApplicationStatus should not be null");
        assertEquals(2, savedStatus.getStatus(), "The saved status should be '2'");
        verify(applicationStatusRepository, times(1)).save(applicationStatus); // Verify save was called once
    }
}


