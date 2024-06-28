package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "member")
@JsonIncludeProperties({"id", "name", "address", "email", "phoneNumber", "role", "isValidated"})
public class Member implements UserDetails {
    @Id
    @Column(name = "id", length = 5, nullable = false)
    private String id;
    @Column(name = "name", length = 50)
    private String name;
    @Column(name = "address", length = 50)
    private String address;
    @Column(name = "password", nullable = false)
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$", message = "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers, and special characters")
    private String password;
    @Column(name = "email", length = 50, nullable = false, unique = true)
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Invalid email format")
    private String email;
    @Column(name = "phoneNum", length = 10)
    @Pattern(regexp = "^(0[0-9]{2}[0-9]{3}[0-9]{4})|([0-9]{2}[0-9]{3}[0-9]{4})$", message = "Invalid phone number format")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder.Default
    private Boolean isValidated = false;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Token> tokens;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Candidate candidate;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Enterprise enterprise;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of((GrantedAuthority) () -> role.name());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
