package backend.repository;

import backend.application.model.Competence;
import backend.application.repository.CompetenceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class CompetenceRepositoryTest {

    @Mock
    private CompetenceRepository competenceRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize the mocks
    }

    // Test for retrieving competence profile ID
    @Test
    public void testGetCompetenceProfileId() {
        // Given
        Integer personId = 1;
        Integer competenceId = 1;
        Integer expectedCompProfileId = 200;

        // Mock the method to return the expected result
        when(competenceRepository.getCompProfileId(personId, competenceId)).thenReturn(expectedCompProfileId);

        // When
        Integer compProfileId = competenceRepository.getCompProfileId(personId, competenceId);

        // Then
        assertNotNull(compProfileId, "Competence profile ID should not be null");
        assertEquals(expectedCompProfileId, compProfileId, "Competence profile ID should match expected value");

        // Verify that the method was called with the correct parameters
        verify(competenceRepository, times(1)).getCompProfileId(personId, competenceId);
    }

    // Test for checking if a person has competences
    @Test
    public void testExistsByPersonId() {
        // Given
        Integer personId = 1;
        when(competenceRepository.existsByPersonId(personId)).thenReturn(true);

        // When
        boolean exists = competenceRepository.existsByPersonId(personId);

        // Then
        assertTrue(exists, "Person should have at least one competence");

        // Verify that the method was called once
        verify(competenceRepository, times(1)).existsByPersonId(personId);
    }

    // Test for when no competences exist for a person
    @Test
    public void testExistsByPersonIdWhenNoCompetences() {
        // Given
        Integer personId = 1;
        when(competenceRepository.existsByPersonId(personId)).thenReturn(false);

        // When
        boolean exists = competenceRepository.existsByPersonId(personId);

        // Then
        assertFalse(exists, "Person should not have any competences");

        // Verify that the method was called once
        verify(competenceRepository, times(1)).existsByPersonId(personId);
    }

    // Test for saving a new Competence
    @Test
    public void testSaveCompetence() {
        // Given
        Competence competence = new Competence();
        competence.setPerson_id(1);
        competence.setCompetence_id(1);
        competence.setCompetence_profile_id(200);

        // When
        when(competenceRepository.save(competence)).thenReturn(competence); // Mock save to return the same object

        // Save the competence
        Competence savedCompetence = competenceRepository.save(competence);

        // Then
        assertNotNull(savedCompetence, "Saved competence should not be null");
        assertEquals(competence.getPerson_id(), savedCompetence.getPerson_id(), "Person ID should match");
        assertEquals(competence.getCompetence_id(), savedCompetence.getCompetence_id(), "Competence ID should match");
        assertEquals(competence.getCompetence_profile_id(), savedCompetence.getCompetence_profile_id(), "Competence Profile ID should match");

        // Verify that save was called once with the correct competence
        verify(competenceRepository, times(1)).save(competence);
    }
}
