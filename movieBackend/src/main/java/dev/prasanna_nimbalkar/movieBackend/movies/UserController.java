package dev.prasanna_nimbalkar.movieBackend.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
        try {
            // Assume payload contains 'username', 'password', and 'email' keys
            User newUser = new User(
                    payload.get("username"),
                    payload.get("password"), // Password should be hashed in the UserService
                    payload.get("email"),
                    LocalDateTime.now(),
                    LocalDateTime.now()
            );
            User registeredUser = userService.registerUser(newUser);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (CustomException ex) {
            // CustomException is thrown when email already exists
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> payload) {
        boolean isAuthenticated = userService.authenticateUser(
                payload.get("username"),
                payload.get("password")
        );

        if (isAuthenticated) {
            return new ResponseEntity<>("User logged in successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Login failed", HttpStatus.UNAUTHORIZED);
        }
    }

    // Exception handler for CustomException
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> handleCustomException(CustomException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    // Generic exception handler for other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        // Log the exception details for debugging purposes
        ex.printStackTrace();
        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Custom exception for handling registration errors
class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}
