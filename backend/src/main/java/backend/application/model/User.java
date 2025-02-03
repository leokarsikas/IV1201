package backend.application.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class User {
    private String firstName;
    private String lastName;
    private String pnr;
    private String email;
    private String password;
    private String username;

    public User(String firstName, String lastName, String pnr, String email, String password, String username){
        this.firstName = firstName;
        this.lastName = lastName;
        this.pnr = pnr;
        this.email = email;
        this.password = password;
        this.username = username;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", pnr='" + pnr + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
