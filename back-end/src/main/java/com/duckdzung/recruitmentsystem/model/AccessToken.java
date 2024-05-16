package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Builder
@DiscriminatorValue("ACCESS_TOKEN")
public class AccessToken extends Token{
    public AccessToken() {
        super();
    }
}
