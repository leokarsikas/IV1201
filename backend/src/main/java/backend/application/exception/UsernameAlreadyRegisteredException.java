package backend.application.exception;

public class UsernameAlreadyRegisteredException extends RuntimeException{

    public UsernameAlreadyRegisteredException(String message) {
        super(message);
    }
}
