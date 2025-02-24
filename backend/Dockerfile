# Use a lightweight JDK base image
FROM eclipse-temurin:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar app.jar

# Expose port 8080 for the application
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]   