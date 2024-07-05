package com.duckdzung.recruitmentsystem.model;

import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackForm {
    private String name;
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Invalid email format")
    private String email;
    @Pattern(regexp = "^(0[0-9]{2}[0-9]{3}[0-9]{4})|([0-9]{2}[0-9]{3}[0-9]{4})$", message = "Invalid phone number format")
    private String phoneNumber;
    private String trainingTips;
    private String message;

    @Override
    public String toString() {
        return "Name: " + getName() + "\n" +
                "Phone number: " + getPhoneNumber() + "\n" +
                "Training tips: " + getTrainingTips() + "\n" +
                "Message: " + getMessage();
    }
}
