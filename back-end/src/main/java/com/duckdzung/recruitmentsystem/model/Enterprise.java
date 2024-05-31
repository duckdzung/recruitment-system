package com.duckdzung.recruitmentsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Enterprise {

    @Id
    private String id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false, unique = true, referencedColumnName = "id")
    @JsonIgnore
    private Member member;

    @Column(name = "company_name", length = 50, nullable = false)
    private String companyName;

    @Column(name = "tax_code", length = 13, nullable = false)
    private String taxCode;

    LocalDate dateOfExpiration;

}
