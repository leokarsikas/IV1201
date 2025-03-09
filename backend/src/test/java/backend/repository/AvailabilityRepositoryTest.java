package backend.repository;

import backend.application.model.Availability;
import backend.application.repository.AvailabilityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Timestamp;


import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class AvailabilityRepositoryTest {

    @Mock
    private AvailabilityRepository availabilityRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize the mocks
    }

    @Test
    public void testGetAvailabilityId() {
        // Given
        Integer personId = 1;
        Timestamp fromDate = Timestamp.valueOf("2025-03-09 10:00:00");
        Timestamp toDate = Timestamp.valueOf("2025-03-09 18:00:00");
        Integer expectedAvailabilityId = 10;

        when(availabilityRepository.getAvailabilityId(personId, fromDate, toDate)).thenReturn(expectedAvailabilityId);

        // When
        Integer availabilityId = availabilityRepository.getAvailabilityId(personId, fromDate, toDate);

        // Then
        assertNotNull(availabilityId, "Availability ID should not be null");
        assertEquals(expectedAvailabilityId, availabilityId, "Availability ID should match expected value");
    }

    @Test
    public void testExistsByPersonId() {
        // Given
        Integer personId = 1;
        when(availabilityRepository.existsByPersonId(personId)).thenReturn(true);

        // When
        boolean exists = availabilityRepository.existsByPersonId(personId);

        // Then
        assertTrue(exists, "Person should have at least one availability record");
    }

    @Test
    public void testSaveAvailability() {
        // Given
        Availability availability = new Availability();
        availability.setPerson_id(1);
        availability.setFrom_date(Timestamp.valueOf("2025-03-09 10:00:00"));
        availability.setTo_date(Timestamp.valueOf("2025-03-09 18:00:00"));

        // When
        when(availabilityRepository.save(availability)).thenReturn(availability); // Mock the save method to return the same object

        // Save the availability
        Availability savedAvailability = availabilityRepository.save(availability);

        // Then
        assertNotNull(savedAvailability, "Saved availability should not be null");
        assertEquals(availability.getPerson_id(), savedAvailability.getPerson_id(), "Person ID should match");
        assertEquals(availability.getFrom_date(), savedAvailability.getFrom_date(), "From date should match");
        assertEquals(availability.getTo_date(), savedAvailability.getTo_date(), "To date should match");

        // Verify that save was called once with the correct availability
        verify(availabilityRepository, times(1)).save(availability);
    }
}

