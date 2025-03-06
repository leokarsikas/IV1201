package backend.application.config;

import backend.application.service.AuthService;
import backend.application.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *  Filter that checks the existence and validity of a token sent
 *  in a cookie from a client. Authenticates a user if successful.
 *  Extends the OncePerRequestFilter abstract class.
 */
@Component
public class JWTFilter extends OncePerRequestFilter {

    private JWTService jwtService;
    private AuthService authService;

    /**
     * Constructor for the JWTFilter. Initialises an instance of
     * Authservice and JWTService.
     * @param authService Service for authenticating with user credentials.
     * @param jwtService Service for creating, manipulating and authenticating with JWTs.
     */
    public JWTFilter(AuthService authService, JWTService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    /**
     * Filter responsible for authenticating by JWTs.
     * Upon successful authentication it gets the corresponding user
     * @param request received HTTPS request
     * @param response HTTPS response to piggyback on
     * @param filterChain filterchain for sending and receiving request/response
     * @throws ServletException thrown if a servlet error happens.
     * @throws IOException thrown if an I/O error happens.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = getTokenFromCookie(request);
        String username = null;

        if (token != null) {
            System.out.println("Frontend provided a token: " + token);
            username = jwtService.extractUsername(token);
            int role = jwtService.extractRole(token);
            System.out.println("This is the role: " + role);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = authService.loadUserByUsername(username);
                if (jwtService.validateToken(token)) {
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    String roleName = "ROLE_" + role;
                    System.out.println("Setting authority: " + roleName);
                    authorities.add(new SimpleGrantedAuthority(roleName));

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(user, null, authorities);
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    System.out.println("JWT token not correct or expired");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token invalid or expired. Please login again.");
                    return;
                }
            } else {
                System.out.println("Username missing from token!");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token invalid. Please login again.");
                return;
            }
        } else {
            System.out.println("Frontend provided no token.");
        }


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Security Context Authentication: " + authentication);

        if (authentication != null) {
            System.out.println("Authorities: " + authentication.getAuthorities());
        } else {
            System.out.println("No authentication set in Security Context.");
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if( cookies != null)
            for(Cookie cookie : cookies)
                if(cookie.getName().equals("token"))
                    return cookie.getValue();
        return null;
    }
}