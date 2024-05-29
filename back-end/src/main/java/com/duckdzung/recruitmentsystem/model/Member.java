package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.enums.Role;
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
    @Column(name = "username", length = 30, nullable = false, unique = true)
    @Pattern(regexp = "^[a-zA-Z0-9_]{5,30}$", message = "Username must contain only letters, numbers, and underscores, and have a length of 5-30 characters")
    private String username;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Token> tokens;

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
