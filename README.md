# Leos Jobbland - Group 7

This is a student project submission for the course IV1201 - Design of Global Applications given at KTH, Stockholm. The developed programme provides a recruitment platform for a fictional company. It allows people who want to apply for a position at the company to send in an application, providing contact details and specifying their previous experience. Furthermore, administrative personnel have privileged access to a GUI where they can see if each user's application has yet been handled.
The application is live through azure at https://red-sky-0a11c1a03.4.azurestaticapps.net/

## Functionalities of the platform

### Registration
In order to access any functionality of the platform, any new applicant has to register a new account. The registration page enforces submission of full name, personnummer, email address, password and username. Format validation is also enforced, with the user being informed of any invalid formatting and how to fix it. Passwords are encrypted before being saved to the database.

### Login
Any users who have previously registered an account (as well as administrative personnel entered into the database of course) can log in to their account using their password and either their submitted email or username. Upon successful validation with the database the user is supplied with a JWT in a Response Cookie, used for continuous authentication and authorisation of the user while navigating the platform.

### Application page
The application page is where an applicant can construct and submit a new application. It can only be accessed if the user is logged in to their account. The user is prompted to fill in how many years of experience they have working as a ticket vendor, lottery vendor and rollercoaster operator. They are also required to specify at least one date interval they are available for work.

### Recruiter GUI
The recruiter interface can only be accessed by logged in administrative personnel. It fetches the applications of all users and displays whether each application is unhandled, accepted or rejected respectively. 

### Landing page
The first page when accessing the platform is used mainly for navigation. Additional functionality is options to change the language of the program, as well as the user's email or username being displays to provide confirmation to the user that they are in an authenticated mode.

# Documentation
All public declarations have been explained with **Javadoc** in the backend and **TSDoc** in the frontend. We hope that all declarations are named aptly enough to intuitively grant understanding of their purpose and function.

//Group 7
