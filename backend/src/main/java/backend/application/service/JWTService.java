package backend.application.service;

import backend.application.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService {

    private String secret = "secret";

    public String createToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return
                Jwts
                    .builder()
                    .claims()
                    .add(claims)
                    .subject(user.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    //216000 = 1 timme
                    .expiration(new Date(System.currentTimeMillis()+216000))
                    .and()
                    .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)))
                    .compact();
    }

    public static String getUsername(String token){
            return Jwts
                    .parser()
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
    }



    public boolean validateToken(String token, UserDetails userDetails) {
        if(userDetails.getUsername().equals(getUsername(token)) && isNotExpired(token)) {
            return true;
        }
        return false;
    }

    private boolean isNotExpired(String token) {
        Date expiriationTime =Jwts
                .parser()
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();

        return expiriationTime.before(new Date(System.currentTimeMillis()+216000));
    }

}