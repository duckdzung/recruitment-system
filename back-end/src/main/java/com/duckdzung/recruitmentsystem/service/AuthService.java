package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.exception.*;
import com.duckdzung.recruitmentsystem.model.*;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.duckdzung.recruitmentsystem.model.enums.TokenType;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import com.duckdzung.recruitmentsystem.repository.TokenRepository;
import com.duckdzung.recruitmentsystem.repository.MemberRepository;
import com.duckdzung.recruitmentsystem.util.InputValidator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class AuthService {
    private final MemberRepository memberRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final TokenRepository<AccessToken> accessTokenRepository;
    private final TokenRepository<RefreshToken> refreshTokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository<?> tokenRepository;

    public AuthService(MemberRepository memberRepository, EnterpriseRepository enterpriseRepository, TokenRepository<AccessToken> accessTokenRepository, TokenRepository<RefreshToken> refreshTokenRepository, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenRepository<?> tokenRepository) {
        this.memberRepository = memberRepository;
        this.enterpriseRepository = enterpriseRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    public TokenResponse login(AuthRequest signInRequest) {
        authenticateUser(signInRequest.getEmail(), signInRequest.getPassword());
        Member member = getUserByEmail(signInRequest.getEmail());

        return createTokenResponse(member);
    }

    public TokenResponse signUp(AuthRequest signUpRequest) {
        String validationError = validateSignUpRequest(signUpRequest);
        if (validationError != null) {
            throw new InvalidRequestException(validationError);
        }

        if (isEmailOrPhoneTaken(signUpRequest)) {
            throw new DataIntegrityViolationException("Email or phone number is already taken");
        }
        Member member;
        if (signUpRequest.getCompanyName() != null) {
            member = createUser(signUpRequest, Role.ENTERPRISE);
            Enterprise enterprise = Enterprise.builder()
                    .member(member)
                    .companyName(signUpRequest.getCompanyName())
                    .taxCode(signUpRequest.getTaxCode())
                    .build();
            enterpriseRepository.save(enterprise);
        } else {
            member = createUser(signUpRequest, Role.CANDIDATE);
        }

        return createTokenResponse(member);
    }

    public TokenResponse createAdmin(AuthRequest signUpRequest) {
        if (isEmailOrPhoneTaken(signUpRequest)) {
            throw new DataIntegrityViolationException("Email or phone number is already taken");
        }

        Member member = createUser(signUpRequest, Role.ADMIN);
        return createTokenResponse(member);
    }

    private TokenResponse createTokenResponse(Member member) {
        TokenResponse response = new TokenResponse();
        var tokens = generateAndSaveTokens(member);
        response.setAccessToken(tokens.get("jwt"));
        response.setRefreshToken(tokens.get("refreshToken"));
        response.setIssuedAt(jwtService.getIssuedAt(tokens.get("jwt")));
        response.setExpirationTime(jwtService.getExpiration(tokens.get("jwt")));
        return response;
    }

    public TokenResponse refreshToken(String refreshToken) {
        TokenResponse response = new TokenResponse();
        try {
            String email = jwtService.extractEmail(refreshToken);
            Member member = getUserByEmail(email);
            if (tokenRepository.findRefreshTokenByToken(refreshToken).isPresent() && jwtService.isTokenValid(refreshToken, member)) {
                var accessToken = jwtService.generateToken(member);

                // Revoke all user's access tokens
                revokeAllUserAccessTokens(member);
                saveUserToken(member, accessToken, TokenType.ACCESS_TOKEN);
                response.setAccessToken(accessToken);
                response.setIssuedAt(jwtService.getIssuedAt(accessToken));
                response.setExpirationTime(jwtService.getExpiration(accessToken));
            } else {
                throw new InvalidRequestException("Invalid refresh token");
            }
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal server error");
        }
        return response;
    }

    public void logout(AuthRequest logoutRequest) {
        try {
            String email = jwtService.extractEmail(logoutRequest.getAccessToken());
            Member member = getUserByEmail(email);

            if (jwtService.isTokenValid(logoutRequest.getAccessToken(), member)) {
                revokeAllUserTokens(member);

            } else {
                throw new InvalidRequestException("Invalid token");
            }
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal server error");
        }
    }

    public void changePassword(AuthRequest changePasswordRequest) {
        try {
            String email = jwtService.extractEmail(changePasswordRequest.getAccessToken());
            Member member = getUserByEmail(email);

            if (jwtService.isTokenValid(changePasswordRequest.getAccessToken(), member)) {
                member.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
                memberRepository.save(member);

            } else {
                throw new InvalidRequestException("Invalid token");
            }
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal server error");
        }
    }

    private void authenticateUser(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    }

    private Member getUserByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));
    }

    private String validateSignUpRequest(AuthRequest signUpRequest) {
        if (!InputValidator.isValidEmail(signUpRequest.getEmail())) {
            return "Invalid email format";
        }

        if (!InputValidator.isValidPassword(signUpRequest.getPassword())) {
            return "Invalid password format. Password must contain at least one uppercase letter and be at least 8 characters long";
        }

        if (!InputValidator.isValidPhoneNumber(signUpRequest.getPhoneNum())) {
            return "Invalid phone number format";
        }
        return null;
    }

    private boolean isEmailOrPhoneTaken(AuthRequest signUpRequest) {
        return memberRepository.existsByEmail(signUpRequest.getEmail())
                || memberRepository.existsByPhoneNumber(signUpRequest.getPhoneNum());
    }

    private Member createUser(AuthRequest signUpRequest, Role role) {
        Member member = Member.builder()
                .id(generateUserID(role))
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .phoneNumber(truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum()))
                .email(signUpRequest.getEmail())
                .name(signUpRequest.getName())
                .address(signUpRequest.getAddress())
                .role(role)
                .build();
        memberRepository.save(member);
        return member;
    }


    private HashMap<String, String> generateAndSaveTokens(Member member) {
        String jwt = jwtService.generateToken(member);
        String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), member);

        revokeAllUserTokens(member);
        saveUserToken(member, jwt, TokenType.ACCESS_TOKEN);
        saveUserToken(member, refreshToken, TokenType.REFRESH_TOKEN);

        HashMap<String, String> tokens = new HashMap<>();
        tokens.put("jwt", jwt);
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }

    private void saveUserToken(Member member, String jwtToken, TokenType tokenType) {
        if (tokenType == TokenType.ACCESS_TOKEN) {
            AccessToken token = new AccessToken();
            token.setMember(member);
            token.setToken(jwtToken);
            token.setRevoked(false);
            token.setExpired(false);
            accessTokenRepository.save(token);
        } else if (tokenType == TokenType.REFRESH_TOKEN) {
            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setMember(member);
            refreshToken.setToken(jwtToken);
            refreshToken.setRevoked(false);
            refreshToken.setExpired(false);
            refreshTokenRepository.save(refreshToken);
        } else {
            throw new IllegalArgumentException("Invalid token type");
        }
    }

    private void revokeAllUserAccessTokens(Member member) {
        List<?> tokens = tokenRepository.findAllValidTokenByMember(member.getId());
        for (Object token : tokens) {
            if (token instanceof AccessToken) {
                ((AccessToken) token).setRevoked(true);
                ((AccessToken) token).setExpired(true);
                accessTokenRepository.save((AccessToken) token);
            }
        }
    }

    private void revokeAllUserTokens(Member member) {

        List<?> tokens = tokenRepository.findAllValidTokenByMember(member.getId());
        for (Object token : tokens) {
            if (token instanceof AccessToken) {
                ((AccessToken) token).setRevoked(true);
                ((AccessToken) token).setExpired(true);
                accessTokenRepository.save((AccessToken) token);
            } else if (token instanceof RefreshToken) {
                ((RefreshToken) token).setRevoked(true);
                ((RefreshToken) token).setExpired(true);
                refreshTokenRepository.save((RefreshToken) token);
            }
        }
    }

    private String generateUserID(Role role) {
        String prefix = switch (role) {
            case CANDIDATE -> "CA";
            case ENTERPRISE -> "EN";
            case ADMIN -> "AD";
        };
        String latestId = memberRepository.findTopByRoleOrderByIdDesc(role)
                .map(Member::getId)
                .orElse(prefix + "000");

        int id = Integer.parseInt(latestId.substring(2)) + 1;
        return prefix + String.format("%03d", id);
    }

    private String truncateSpaceFromPhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("\\s+", "");
    }
}
