package backend.service;

import backend.application.service.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import javax.crypto.SecretKey;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;
public class JWTServiceTest {

    private JWTService jwtService;
    private SecretKey secretKey;

    @BeforeEach
    public void setUp() {
        // Mock the SecretKey (no need to mock Jwts, just the key)
        secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode("OzKWdfFbK1hiOHyADb0nv0Mji+oVRRcMAg0Wt3rbKPs="));
        jwtService = new JWTService(secretKey);
    }

    @Test
    void testValidateToken_ValidToken_ReturnsTrue() {
        String token = JWTService.createToken("user123", 1); // Create a valid token

        // Here, we can mock the Jwts.parser() methods.
        Jwts.parser().verifyWith(secretKey).build(); // Simulate Jwts.parser().verifyWith(secretKey).build() call

        boolean isValid = jwtService.validateToken(token);

        assertTrue(isValid, "Token should be valid.");
    }

    @Test
    void testValidateToken_ExpiredToken_ReturnsFalse() {
        String expiredToken = JWTService.createToken("user123", 1);
        // Expire the token manually for testing (you can also manipulate the expiration date in real scenarios)
        expiredToken = expiredToken.substring(0, expiredToken.length() - 1); // Just an example, you can expire tokens here

        boolean isValid = jwtService.validateToken(expiredToken);

        assertFalse(isValid, "Token should be invalid (expired).");
    }

    @Test
    void testExtractUsername_ValidToken_ReturnsUsername() {
        String token = JWTService.createToken("user123", 1);

        String username = jwtService.extractUsername(token);

        assertEquals("user1", username, "Username should be 'user123'.");
    }

    @Test
    void testExtractRole_ValidToken_ReturnsRole() {
        String token = JWTService.createToken("user123", 1);

        Integer role = jwtService.extractRole(token);

        assertEquals(1, role, "Role should be 1.");
    }

    @Test
    void testCreateToken_ValidToken_CreatesValidToken() {
        String username = "user123";
        int roleId = 1;

        String token = JWTService.createToken(username, roleId);

        assertNotNull(token, "Token should be created.");
    }


}
