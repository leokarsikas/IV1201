package backend.application.exception;

/**
 * Exception thrown when a username is already registered in the system.
 * This exception is typically thrown when a user attempts to create a new account
 * or update their username to one that already exists in the system.
 */
public class UsernameAlreadyRegisteredException extends RuntimeException{

    /**
     * Constructs a new UsernameAlreadyRegisteredException with the specified detail message.
     *
     * @param message the detail message that explains the cause of the exception
     */
    public UsernameAlreadyRegisteredException(String message) {
        super(message);
    }
}
