package dev.prasanna_nimbalkar.movieBackend.movies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@AllArgsConstructor @NoArgsConstructor
public class User {
    private ObjectId id;
    private String username;
    private String password; // Consider storing a hashed password
    private String email;
    private LocalDateTime created;
    private LocalDateTime updated;

    public User(String username, String password, String email, LocalDateTime created, LocalDateTime updated) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.created = created;
        this.updated = updated;
    }
}
