package backend.application.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/login")
    public String login(){
        return "Login";
    }

    @GetMapping("/secured")
    public String secured(){
        return "This is an authorized page";
    }



}
