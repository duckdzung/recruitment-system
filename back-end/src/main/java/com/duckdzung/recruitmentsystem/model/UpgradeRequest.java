package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.enums.RequestStatus;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "upgrade_request")
public class UpgradeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "address", length = 50, nullable = false)
    private String address;

    @Column(name = "phoneNum", length = 10, nullable = false)
    @Pattern(regexp = "^(0[0-9]{2}[0-9]{3}[0-9]{4})|([0-9]{2}[0-9]{3}[0-9]{4})$", message = "Invalid phone number format")
    private String phoneNumber;

    @Column(name = "company_name", length = 50)
    private String companyName;

    @Column(name = "tax_code", length = 13)
    private String taxCode;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private RequestStatus status;
}

