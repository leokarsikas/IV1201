package backend.application.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private static String secret = "OzKWdfFbK1hiOHyADb0nv0Mji+oVRRcMAg0Wt3rbKPs=";
    private SecretKey key;

    public JWTService() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public static String createToken(String name, int role_id) {
        Map<String, Object> claims = new HashMap<>();
        System.out.println("Secret: "+secret);
        System.out.println("Name: "+name);
        System.out.println("Role ID: "+role_id);
        claims.put("role_id", role_id);
        return
                Jwts
                    .builder()
                    .claims()
                    .add(claims)
                    .subject(name)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    //3600000 = 1 timme
                    .expiration(new Date(System.currentTimeMillis()+3600000))
                    .and()
                    .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)))
                    .compact();
    }

    public static ResponseCookie createResponseCookie(String token) {
        return ResponseCookie.from("token", token)
                .httpOnly(true)
                .path("/")
                .maxAge(36000)         // 10 hours
                .sameSite("Strict") // CSRF protection by restricting cross-origin requests
                .secure(false)                        // CHANGE THIS TO TRUE WHEN DEPLOYING!!
                .build();
    }

    /* Old cookie implementation (saved in case of emergency usage) */
    public static Cookie createCookie(String token){
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/refresh-token");
        //10h
        cookie.setMaxAge(36000);
        cookie.setSecure(true);
        return cookie;
    }

    public boolean validateToken(String token) {
        //Create more exceptions later?
        try {
            Jwts.parser().verifyWith(key).build().parse(token);
            return true;
        }
        catch (ExpiredJwtException ex){
            System.out.println("Expired JWT token: "+ex.getClaims().getSubject());
            return false;
        }
        catch (Exception ex){
            System.out.println("Invalid JWT token: "+ex.getMessage());
            return false;
        }
    }

    //All below is boilerplate.

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

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