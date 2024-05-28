# Use the official Maven/Java image to create a build environment.
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the container
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /app

# Copy the compiled artifact from the build environment
COPY --from=build /app/target/recruitment-system-0.0.1-SNAPSHOT.jar ./app.jar

# Expose the port your application runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
