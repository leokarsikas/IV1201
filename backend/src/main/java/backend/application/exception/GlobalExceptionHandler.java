package backend.application.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleDatabaseConnectionException(DataAccessException ex) {

        logger.error("Database connection error occurred: {}", ex.getMessage());

        String errorMessage = "Unable to connect to the database. Please try again later.";
        return new ResponseEntity<>(new ErrorResponse("Database Error", errorMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        logger.error("An unexpected error occurred: {}", ex.getMessage());

        String errorMessage = "An unexpected error occurred.";
        return new ResponseEntity<>(new ErrorResponse("General Error", errorMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}