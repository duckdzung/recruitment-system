package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.AuthRequest;
import com.duckdzung.recruitmentsystem.common.TokenResponse;
import com.duckdzung.recruitmentsystem.repository.CandidateRepository;
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
    private final CandidateRepository candidateRepository;
    private final TokenRepository<AccessToken> accessTokenRepository;
    private final TokenRepository<RefreshToken> refreshTokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository<?> tokenRepository;

    public AuthService(MemberRepository memberRepository, EnterpriseRepository enterpriseRepository, CandidateRepository candidateRepository, TokenRepository<AccessToken> accessTokenRepository, TokenRepository<RefreshToken> refreshTokenRepository, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenRepository<?> tokenRepository) {
        this.memberRepository = memberRepository;
        this.enterpriseRepository = enterpriseRepository;
        this.candidateRepository = candidateRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    public TokenResponse login(AuthRequest signInRequest) {
        try {
            authenticateUser(signInRequest.getEmail(), signInRequest.getPassword());
            Member member = getUserByEmail(signInRequest.getEmail());

            return createTokenResponse(member);
        } catch (Exception e) {
            throw new InvalidRequestException("Invalid email or password");
        }
    }

    public TokenResponse signUp(AuthRequest signUpRequest) {
        String validationError = validateSignUpRequest(signUpRequest);
        if (validationError != null) {
            throw new InvalidRequestException(validationError);
        }
        if (isEmailOrUsernameTaken(signUpRequest)) {
            throw new DataIntegrityViolationException("Email or username is already taken");
        }
        Member member = createUser(signUpRequest, Role.MEMBER);


        return createTokenResponse(member);
    }

    public TokenResponse updateMember(String memberId, AuthRequest signUpRequest) {
        String validationError = InputValidator.isValidPhoneNumber(truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum())) ? null : "Invalid phone number format";
        if (validationError != null) {
            throw new InvalidRequestException(validationError);
        }

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        if(member.getRole() != Role.MEMBER) {
            throw new InvalidRequestException("Member can only upgrade their account once");
        }

        updateMemberDetails(member, signUpRequest);

        memberRepository.save(member);

        return createTokenResponse(member);
    }

    private void updateMemberDetails(Member member, AuthRequest signUpRequest) {
        // Set common details
        member.setName(signUpRequest.getName());
        member.setAddress(signUpRequest.getAddress());
        member.setPhoneNumber(truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum()));

        // Check if company name is provided
        if (signUpRequest.getCompanyName() != null) {
            // Update as enterprise
            member.setRole(Role.ENTERPRISE);
            updateAsEnterprise(member, signUpRequest);
        } else {
            // Update as candidate
            member.setRole(Role.CANDIDATE);
            updateAsCandidate(member);
        }
    }

    private void updateAsEnterprise(Member member, AuthRequest signUpRequest) {
        Enterprise enterprise = Enterprise.builder()
                .id(generateUserID(Role.ENTERPRISE))
                .member(member)
                .companyName(signUpRequest.getCompanyName())
                .taxCode(signUpRequest.getTaxCode())
                .build();
        enterpriseRepository.save(enterprise);
    }

    private void updateAsCandidate(Member member) {
        Candidate candidate = Candidate.builder()
                .id(generateUserID(Role.CANDIDATE))
                .member(member)
                .build();
        candidateRepository.save(candidate);
    }


    public TokenResponse createAdmin(AuthRequest signUpRequest) {
        if (isEmailOrPhoneOrUsernameTaken(signUpRequest)) {
            throw new DataIntegrityViolationException("Email or username or phone number is already taken");
        }

        Member member = createUser(signUpRequest, Role.ADMIN);
        return createTokenResponse(member);
    }

    private boolean isEmailOrPhoneOrUsernameTaken(AuthRequest signUpRequest) {
        return memberRepository.existsByEmail(signUpRequest.getEmail())
                || memberRepository.existsByPhoneNumber(signUpRequest.getPhoneNum())
                || memberRepository.existsByUsername(signUpRequest.getUsername());
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

    private boolean isEmailOrUsernameTaken(AuthRequest signUpRequest) {
        return memberRepository.existsByEmail(signUpRequest.getEmail())
                || memberRepository.existsByUsername(signUpRequest.getUsername());
    }

    private Member createUser(AuthRequest signUpRequest, Role role) {
        Member member = Member.builder()
                .id(generateUserID(role))
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .phoneNumber(role != Role.ADMIN ? null : truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum()))
                .name(role != Role.ADMIN ? null : signUpRequest.getName())
                .address(role != Role.ADMIN ? null : signUpRequest.getAddress())
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
            case MEMBER -> "ME";
        };
        String latestId = memberRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                .map(Member::getId)
                .orElse(prefix + "000");

        int id = Integer.parseInt(latestId.substring(2)) + 1;
        return prefix + String.format("%03d", id);
    }

    private String validateSignUpRequest(AuthRequest signUpRequest) {
        if (!InputValidator.isValidEmail(signUpRequest.getEmail())) {
            return "Invalid email format";
        }

        if (!InputValidator.isValidPassword(signUpRequest.getPassword())) {
            return "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers, and special characters";
        }

        if (!InputValidator.isValidUsername(signUpRequest.getUsername())) {
            return "Username must contain only letters, numbers, and underscores, and have a length of 5-30 characters";
        }
        return null;
    }

    private String truncateSpaceFromPhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("\\s+", "");
    }
}
