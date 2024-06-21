package com.duckdzung.recruitmentsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Enterprise {

    @Id
    @Column(name = "id", length = 5, nullable = false)
    private String id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false, unique = true, referencedColumnName = "id")
    private Member member;

    @Column(name = "company_name", length = 50, nullable = false)
    private String companyName;

    @Column(name = "tax_code", length = 13, nullable = false)
    private String taxCode;

    LocalDate dateOfExpiration;

}
