package backend.application.controller;

import backend.application.exception.EmailAlreadyRegisteredException;
import backend.application.exception.ErrorResponse;
import backend.application.exception.PersonNumberAlreadyRegisteredException;
import backend.application.exception.UsernameAlreadyRegisteredException;
import backend.application.model.Competence;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class ApplicationController {
    @PostMapping("/send-application")
    public ResponseEntity<Object> sendApplication(@RequestBody Competence competence) {
        return ResponseEntity.status(HttpStatus.CREATED).body(competence);
    }
}
