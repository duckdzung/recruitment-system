package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileId;

    @Column(name = "is_validate")
    @Builder.Default
    private boolean isValidate = false;

    @Column(name = "date_of_receipt")
    @CreationTimestamp
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
