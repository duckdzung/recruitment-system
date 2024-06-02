package com.duckdzung.recruitmentsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nominee")
@JsonSerialize
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Nominee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int nomineeId;
    @Column(length = 50)
    String position;
    @Column(length = 50)
    String description;
}
