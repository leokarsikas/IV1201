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

***

## Detailed documentation
All public declarations have been explained with **Javadoc** in the backend and **TSDoc** in the frontend. We hope that all declarations are named aptly enough to intuitively grant understanding of their purpose and function. Below follow some broad explanations of all packages.

### Backend
#### Java package
  * **config**  
      *Contains the security configuration and authentication filter files responsible for pre-authorisation/-authentication and access permissions (including CORS configuration).*  
  * **controller**  
      *Contains all controllers responsible for receiving and distributing orders and data. Eaxh controller has api mappings of concern-specific nature for managing connections from and to clients.*   
  * **DTO**  
      *Contains dedicated objects responsible for shuttling data between the controllers and their respective services.*  
  * **exception**  
      *Contains customised errors for better error handling.*  
  * **model**  
      *Contains classes for building and manipulating objects interacting with the database.*    
  * **repository**  
      *Contains interfaces for querying the database, mainly extending the JpaRepository part of the Spring Framework.*  
  * **service**  
    *Contains all logic for handling and manipulating data from the user and data from the database in order to serve its controller.*  

#### Other particular files
  * The **Application** file in the **backend.application** package runs the program
  * The **application.properties** file in the **resources** package contains all secrets and will be supplied privately.
  * The **pom.xml** file contains all dependency declarations for the backend

### Frontend
#### Src package
  * **assets**  
    *Contains images and logos displayed on the website.*  
  * **components**  
    *Contains functionality and design for specific isolated components such as buttons and calendars.*  
  * **context**  
    *Contains functions for validating authenticating with the server.*  
  * **hooks**  
    *Contains functions tracking state and async promise resolving when calling the server.*
  * **locales**  
    *Contains language translation tables for text in the UI*  
  * **pages**  
    *Contains the graphical structuring of each webpage. Like a view, the pages utilize mainly html code for the user to gain a graphical interface to interact with.*  
  * **services**  
    *Contains functions for contacting the RESTApi of the servers, using HTTP requests and configuration details.*  
  * **styling**  
    *Contains the main chunk of css files responsible for tuning the look of all pages.*  
  * **types**  
    *Contains interfaces for the structure of complex objects communicated with the server.*  
  * **utils**  
    *Contains functions for validating the format of data entered by the user accross the different forms of the website.*  
    
#### Other particular files
  * The **package.json** and **tsconfig.app.json** files in the **vite-project** package contain all dependencies for the frontend.  
  * The **Root.tsx** and **main.tsx** files in the **src** package specifies all page endpoints and renders it within authprovider wrappers.  
  * The **i18n.ts** file in the **src** package handles ui localisation for changing languages.

***

## Developing on localhost
For the next team working on it, the following is what you need to do to get it running:

* Clone this repository
* Run **npm install** from the package containing your **package.json** file (this installs your frontend dependencies)
* Run **mvn clean install** from the package containg your **pom.xml** file (this installs your backend dependencies)
* Add our privately supplied **application.properties** file to the resources package of the backend. (This contains all the secrets)  
  If you have your own database and encryption key to use,
    simply add an empty application.properties file and add your details according to the following
    structure (the database needs to be PostgreSQL in order to work without modifying the code):  
    * spring.datasource.url=
    * spring.datasource.username=  
    * spring.datasource.password=  
    * JWT_SECRET=  
    * spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect  
    * spring.jpa.hibernate.ddl-auto=update  
    * spring.jpa.show-sql=true  
    * spring.jpa.properties.hibernate.format_sql=true
* Run the program in your IDE. We recommend running the backend in **IntelliJ**, using the **Application** file
    while running the frontend in **VSCode** using the **npm run dev** command
* The server will be running on http://localhost:5173/ unless your IDE specifies otherwise

***

## Architectural details
Further resources and documentation can be found on the repository wiki.

### //Group 7
