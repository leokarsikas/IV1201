package backend.application.exception;

public class PersonNumberAlreadyRegisteredException extends RuntimeException{
    public PersonNumberAlreadyRegisteredException(String message) {
        super(message);
    }
}
