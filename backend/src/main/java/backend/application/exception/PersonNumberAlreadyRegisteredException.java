package backend.application.exception;

/**
 * Exception thrown when a person's person number is already registered in the system.
 * This exception is thrown when a user attempts to register their personal number
 * to one that already exists in the database.
 */
public class PersonNumberAlreadyRegisteredException extends RuntimeException{
    /**
     * Constructs a new PersonNumberAlreadyRegisteredException with the specified detail message.
     *
     * @param message the detail message that explains the cause of the exception
     *                (e.g., "This person's number is already registered.")
     */
    public PersonNumberAlreadyRegisteredException(String message) {
        super(message);
    }
}
