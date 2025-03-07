package backend.application.config;

import backend.application.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Configuration for authentication, authorisation, CORS and password encoding.
 * Sets authentication priority order and creates authentication providers.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Constructor of password encoders for encoding passwords.
     * @return a BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Sets what is allowed by CORS. Allows any method, any header
     * and only requests from http://localhost:5173.
     * @return configuration source for authorized CORS connections.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Add your frontend origin
        configuration.addAllowedOrigin("https://red-sky-0a11c1a03.4.azurestaticapps.net");
        configuration.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, etc.)
        configuration.addAllowedHeader("*"); // Allow all headers
        configuration.setAllowCredentials(true); // Enable credentials (e.g., cookies, authorization headers)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply CORS to all endpoints
        return source;
    }

    /**
     * Sets configuration details for which endpoints are allowed to be accessed
     * by whom. Restricts certain endpoints based on the authentication and authorisation of the user.
     * Determines the order of applying filters as well as a stateless session management.
     * @param http security object to give configuration.
     * @param jwtFilter jwt filter to authenticate with first.
     * @return the finished securityfilterchain configuration
     * @throws Exception if any error occurs
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTFilter jwtFilter) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Use the custom CORS configuration
            .authorizeHttpRequests(endpoints -> {
                endpoints.requestMatchers("/").permitAll();
                endpoints.requestMatchers("/login").permitAll();
                endpoints.requestMatchers("/register").permitAll();
                endpoints.requestMatchers("/api/").permitAll();
                endpoints.requestMatchers("/api/login-user").permitAll();
                endpoints.requestMatchers("/api/register-user").permitAll();
                endpoints.requestMatchers("/api/user/**").authenticated();
                endpoints.requestMatchers("/api/admin/get-all-applications").hasAuthority("ROLE_1");
                endpoints.requestMatchers("/api/send-application").permitAll();
                endpoints.anyRequest().authenticated();
            })
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    /**
     * Creates a new DAO authentication provider for password encoding
     * and user credential authentication.
     * @param authService service that authenticates and retrieves users
     * @return a new authentication provider set with the password encoder
     * and authService provided.
     */
    @Bean
    public AuthenticationProvider authenticationProvider(AuthService authService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(authService);
        return authProvider;
    }


}


