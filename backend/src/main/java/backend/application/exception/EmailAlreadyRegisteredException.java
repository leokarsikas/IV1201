package backend.application.exception;

/**
 * Exception thrown when an email address is already registered in the system.
 * This exception is typically thrown when a user attempts to register or update their email
 * to one that already exists in the system.
 */
public class EmailAlreadyRegisteredException extends RuntimeException {
    /**
     * Constructs a new {@code EmailAlreadyRegisteredException} with the specified detail message.
     *
     * @param message the detail message that explains the cause of the exception
     *                (e.g., "The email is already registered.")
     */
    public EmailAlreadyRegisteredException(String message) {
        super(message);
    }
}
