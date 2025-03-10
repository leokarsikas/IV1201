package backend.application.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

/**
 * The SecretDTO shuttles the JWT encryption secret,
 * hiding it from the public git repository.
 *
 * This class uses Lombok annotations to automatically generate getter, setter,
 * no-args constructor, and all-args constructor methods, reducing boilerplate code.
 */
@Component
public class SecretDTO {

    @Value("${JWT_SECRET}")
    private String secret;
}

