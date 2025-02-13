package backend.application.controller;

import backend.application.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/secured")
    public String secured(){
        return "This page is open only when logged in.";
    }

    @GetMapping("/login")
    public ResponseEntity<String> open() {
        return ResponseEntity.ok("This page is open for all.");
    }

}
