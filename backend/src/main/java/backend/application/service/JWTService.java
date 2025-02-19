package backend.application.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
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

    public static String getUsername(String token){
         String username = Jwts
                        .parser()
                        .build()
                        .parseSignedClaims(token)
                        .getPayload()
                        .getSubject();
            System.out.println("Username from frontend: " + username);
            return username;
    }

    //All below is boilerplate. (ValidateToken, isExpired, extractExpiration isNotExpired)

    public boolean validateToken(String token) {
        Jwts.parser().verifyWith(key).build().parse(token);
        return true;
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    private boolean isExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
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
        System.out.println("allClaims"+allClaims);
        return allClaims;
    }


    private boolean isNotExpired(String token) {
        Date expiriationTime =Jwts
                .parser()
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();

        return expiriationTime.before(new Date(System.currentTimeMillis()+3600000));
    }

}