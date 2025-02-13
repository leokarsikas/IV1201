package backend.application.config;

import backend.application.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.*;

//Vet inte om vi vill ha det här i ett separat package.
// Feel free att flytta den vid behov eller lust.
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(endpoints -> {
                endpoints.requestMatchers("/").permitAll();
                endpoints.requestMatchers("/login").permitAll();
                endpoints.requestMatchers("/register").permitAll();
                endpoints.requestMatchers("/api/login-user").permitAll();
                endpoints.requestMatchers("/api/register-user").permitAll();
                //endpoints.requestMatchers("/users").permitAll();
                endpoints.anyRequest().authenticated();
            })
            //.oauth2Login(withDefaults())
            //.formLogin(withDefaults())
            .httpBasic(withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        authProvider.setUserDetailsService(userService);
        return authProvider;
    }

}
