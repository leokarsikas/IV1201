package backend.application.config;

import backend.application.service.AuthService;
import backend.application.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getBearerToken(request);
        String username = null;
        System.out.println("JWTConfig token: "+token);
            if(token != null) {
                username = jwtService.extractUsername(token);
                if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails user = authService.loadUserByUsername(username);
                    if(jwtService.validateToken(token)){
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, user.getAuthorities());
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        filterChain.doFilter(request, response);
    }

    private String getBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
           return header.split(" ")[1];
        }
        return null;
    }
}