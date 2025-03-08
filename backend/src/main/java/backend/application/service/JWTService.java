package backend.application.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.http.ResponseCookie;

import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


/**
 * Service class for creating, manipulating and authenticating with JWTs.
 * Also handles cookie creation and claim extraction.
 */
@Service
public class JWTService {

    private static String secret = "OzKWdfFbK1hiOHyADb0nv0Mji+oVRRcMAg0Wt3rbKPs=";
    public SecretKey key;

    /**
     * Constructor for the JWTService.
     * Creates keys for the tokens based on the secret.
     */
    public JWTService() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public JWTService(SecretKey key) {
        this.key = key;
    }

    /**
     * Creates a new JWT for the user in question. Containing username, role_id
     * the time of issuing and the time of expiration.
     * @param username Username of the user in question, to be included in the token.
     * @param role_id Role id of the user in question, to be included in the token.
     * @return A new token for the user.
     */
    public static String createToken(String username, int role_id) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role_id", role_id);
        return
                Jwts
                    .builder()
                    .claims()
                    .add(claims)
                    .subject(username)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    //36000000 = 10 timmar
                    .expiration(new Date(System.currentTimeMillis()+36000000))
                    .and()
                    .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)))
                    .compact();
    }

    /**
     * Creates a new ResponseCookie with the provided token inside.
     * @param token JWT to be stored in the cookie.
     * @return A new ResponseCookie with the provided token inside.
     */
    public static ResponseCookie createResponseCookie(String token) {
        return ResponseCookie.from("token", token)
                .httpOnly(true)
                .path("/")
                .maxAge(36000)         // 10 hours
                .sameSite("None") // CSRF protection by restricting cross-origin requests
                .secure(true)                        // CHANGE THIS TO TRUE WHEN DEPLOYING!!
                .build();
    }

    /**
     * Checks if the provided token is valid. Verifies that it can be built with the
     * secret key and that it is not expired.
     * @param token The users token to be validated.
     * @return Boolean true if the validation is successful, otherwise false.
     */
    public boolean validateToken(String token) {
        //Create more exceptions later?
        try {
            Jwts.parser().verifyWith(key).build().parse(token);
            return true;
        }
        catch (ExpiredJwtException ex){
            /*System.out.println("Expired JWT token: "+ex.getClaims().getSubject());*/
            return false;
        }
        catch (Exception ex){
            /*System.out.println("Invalid JWT token: "+ex.getMessage());*/
            return false;
        }
    }

    /**
     * Extracts the subject from the token, which should always be the username.
     * @param token Token from which the username should be extracted.
     * @return The extracted username.
     */
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the role_id from the token.
     * @param token Token from which the role_id should be extracted.
     * @return The extracted role_id.
     */
    public Integer extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role_id", Integer.class));
    }

    private <Object> Object extractClaim(String token, Function<Claims, Object> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        Claims allClaims = Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return allClaims;
    }
}
