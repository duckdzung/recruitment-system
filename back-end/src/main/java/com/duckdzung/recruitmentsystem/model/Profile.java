package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "candidate_id", nullable = false)
    @Setter
    private Candidate candidate;

    @OneToMany(mappedBy = "profile", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ApplicationForm> applicationForms;

}
