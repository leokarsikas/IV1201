package backend.application.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object (DTO) for user login credentials.
 * This class is used to transfer login-related data between different layers of the application.
 * It includes fields for email, password, and username.
 * In practice either the username or the email can be used to log in, and it depends on what the user sent
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter  // Lombok generates getter methods
@Setter  // Lombok generates setter methods
public class LogInCredentialsDTO {
    String email;
    String password;
    String username;
}
