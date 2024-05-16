package com.duckdzung.recruitmentsystem.model;

import jakarta.persistence.*;
import lombok.*;


@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
@Getter
@Setter
@DiscriminatorColumn(name = "token_type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("TOKEN")

public abstract class Token {

    @Id
    @GeneratedValue
    public Integer id;

    @Column(unique = true)
    public String token;

    public boolean revoked;

    public boolean expired;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", referencedColumnName = "id", nullable = false)
    public Member member;
}