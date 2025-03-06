package backend.application.exception;

/**
 * ErrorResponse is a simple data transfer object (DTO) used to represent error details
 * that are returned to the client in case of an exception or error in the application.
 * This object contains the error type and an associated message that provides more
 * information about the error.
 *
 * <p>The {@code ErrorResponse} class is typically used in conjunction with exception handling
 * to provide a structured response containing both a general error type and a descriptive message.</p>
 */
public class ErrorResponse {

    private String error;
    private String message;

    /**
     * Constructs a new {@code ErrorResponse} with the specified error type and message.
     *
     * @param error the error type or category (e.g., "Database Error", "General Error")
     * @param message a detailed message explaining the error (e.g., "Unable to connect to the database.")
     */
    public ErrorResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }

    /**
     * Gets the error type or category associated with this response.
     *
     * @return the error type, such as "Database Error" or "General Error"
     */
    public String getError() {
        return error;
    }

    /**
     * Sets the error type or category for this response.
     *
     * @param error the error type to set
     */
    public void setError(String error) {
        this.error = error;
    }

    /**
     * Gets the detailed message that explains the error.
     *
     * @return the message providing more details about the error
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the detailed message explaining the error.
     *
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
}