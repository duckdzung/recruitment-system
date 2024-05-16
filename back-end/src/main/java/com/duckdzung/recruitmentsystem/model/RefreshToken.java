package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Builder
@DiscriminatorValue("REFRESH_TOKEN")
public class RefreshToken extends Token{
    public RefreshToken() {
        super();
    }
}
