package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileId;

    @Column(name = "is_validate")
    private boolean isValidate;

    @Column(name = "date_of_receipt")
    private LocalDateTime dateOfReceipt;

    @Column(name = "date_of_processing")
    private LocalDateTime dateOfProcessing;

    @Column(name = "file_path")
    private String filePath;
}
