package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.exception.InternalServerErrorException;
import com.duckdzung.recruitmentsystem.model.FeedbackForm;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final String fromEmail;

    public EmailService(Environment environment) {
        fromEmail = environment.getProperty("spring.mail.username");
    }

    public void sendFeedback(FeedbackForm feedbackForm) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom(fromEmail);
            helper.setTo("thanhhai18121510@gmail.com");
            helper.setSubject("Feedback Form Submission");

            String templateContent = loadTemplate();

            ClassPathResource logoResource = new ClassPathResource("templates/logo.png");
            String message = templateContent
                    .replace("{{name}}", feedbackForm.getName())
                    .replace("{{email}}", feedbackForm.getEmail())
                    .replace("{{phoneNum}}", feedbackForm.getPhoneNum())
                    .replace("{{trainingTips}}", feedbackForm.getTrainingTips())
                    .replace("{{message}}", feedbackForm.getMessage());


            helper.setText(message, true); // enable HTML

            helper.addInline("logoImage", logoResource);

            mailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            throw new InternalServerErrorException("Failed to send feedback email");
        }
    }

    private String loadTemplate() throws IOException {
        ClassPathResource resource = new ClassPathResource("/templates/feedback-template.html");
        try (InputStream inputStream = resource.getInputStream()) {
            try (Scanner scanner = new Scanner(inputStream, StandardCharsets.UTF_8)) {
                return scanner.useDelimiter("\\A").next();
            }
        }
    }
}
