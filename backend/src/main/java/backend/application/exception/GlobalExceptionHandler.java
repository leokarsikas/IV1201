package backend.application.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * GlobalExceptionHandler is a centralized exception handler for managing application-wide exceptions.
 * This class uses {@link ControllerAdvice} to handle exceptions thrown by controllers, and it provides
 * a consistent response structure for different types of errors, such as database connection errors
 * or unexpected errors.
 *
 * <p>The exception handler methods log the error and return a standardized error response with an appropriate HTTP status.</p>
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handles {@link DataAccessException} thrown when a database connection issue occurs.
     * This method logs the error and sends an appropriate error response with a 500 status code.
     *
     * @param ex the {@link DataAccessException} that was thrown
     * @return a {@link ResponseEntity} containing an error response with a message and a 500 status code
     */
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleDatabaseConnectionException(DataAccessException ex) {

        logger.error("Database connection error occurred: {}", ex.getMessage());

        String errorMessage = "Unable to connect to the database. Please try again later.";
        return new ResponseEntity<>(new ErrorResponse("Database Error", errorMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handles any general {@link Exception} thrown by the application.
     * This method logs the error and sends a generic error response with a 500 status code.
     *
     * @param ex the {@link Exception} that was thrown
     * @return a {@link ResponseEntity} containing a generic error response with a message and a 500 status code
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        logger.error("An unexpected error occurred: {}", ex.getMessage());

        String errorMessage = "An unexpected error occurred.";
        return new ResponseEntity<>(new ErrorResponse("General Error", errorMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}