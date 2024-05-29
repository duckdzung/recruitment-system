FROM openjdk:17-jdk-slim

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline -B

RUN mvn package -DskipTests

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]
