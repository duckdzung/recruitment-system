package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Enterprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false, unique = true, referencedColumnName = "id")
    private Member member;

    @Column(name = "company_name", length = 50, nullable = false)
    private String companyName;

    @Column(name = "tax_code", length = 13, nullable = false)
    private String taxCode;

}
