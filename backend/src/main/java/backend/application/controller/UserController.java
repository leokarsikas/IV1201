package backend.application.controller;


import backend.application.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import backend.application.model.User;


// Exceptions

import backend.application.exception.EmailAlreadyRegisteredException;
import backend.application.exception.PersonNumberAlreadyRegisteredException;
import backend.application.exception.UsernameAlreadyRegisteredException;
import backend.application.exception.ErrorResponse;

import java.util.List;

/**
 * Controller class responsible for handling HTTP requests related to user management, including
 * fetching user data, registering new users, and deleting users.
 *
 * <p>This class is part of the backend API and handles endpoints for managing users.
 * It communicates with the service layer for user-related operations.</p>
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;

    /**
     * Constructs a new {@code UserController} with the specified {@link UserService} to handle user-related operations.
     *
     * @param userService the service layer to handle user operations
     */
    public UserController(UserService userService) {

        this.userService = userService;
    }
    /**
     * Endpoint for registering a new user.
     * <p>This method processes a new user registration request, checks for various exceptions like
     * duplicate person numbers, emails, or usernames, and returns an appropriate response.</p>
     *
     * @param user the user object containing the information to be registered
     * @return a {@link ResponseEntity} containing the status and either the newly created user or error details
     */
    @PostMapping("/register-user")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody User user, BindingResult result) {

        if (result.hasErrors()) {
            // Extract validation errors and return a response
            List<String> errors = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .toList();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Validation Failed", errors.toString()));
        }
        try {
            User newUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (PersonNumberAlreadyRegisteredException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Registration Failed", e.getMessage()));
        } catch (EmailAlreadyRegisteredException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Registration Failed", e.getMessage()));
        } catch (UsernameAlreadyRegisteredException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Registration Failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal Server Error", "Something went wrong."));
        }
    }



    /**
     * Endpoint for deleting a user by their ID.
     * <p>This method allows deleting a user from the system based on their user ID.</p>
     *
     * @param id the ID of the user to be deleted
     * @return a {@link ResponseEntity} with a message indicating success or failure
     */
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        boolean isDeleted = userService.deleteUserById(id);

        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
}