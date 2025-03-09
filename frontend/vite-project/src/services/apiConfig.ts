
/* This code snippet is defining a constant variable `API_URL`. 


For the main branch which meant for local use the URL is set to an localhost. 

For the frontend-deploy branch which meant for deployment on azure the endpoint is set to the url of backend. 
It can be found on the azure portal in the backend app-service. 
*/


const API_URL = 'http://localhost:8080/api';

/*It then exports this constant using the `export` keyword, making it
available for use in other modules or files that import it. This allows other parts of the codebase
to access and use the `API_URL` constant for making API requests or other purposes. */

export {API_URL}