package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.AuthRequest;
import com.duckdzung.recruitmentsystem.common.TokenResponse;
import com.duckdzung.recruitmentsystem.exception.DataIntegrityViolationException;
import com.duckdzung.recruitmentsystem.exception.InternalServerErrorException;
import com.duckdzung.recruitmentsystem.exception.InvalidRequestException;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.*;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.duckdzung.recruitmentsystem.model.enums.TokenType;
import com.duckdzung.recruitmentsystem.repository.CandidateRepository;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import com.duckdzung.recruitmentsystem.repository.MemberRepository;
import com.duckdzung.recruitmentsystem.repository.TokenRepository;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.util.InputValidator;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
        if (memberRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new DataIntegrityViolationException("Email is already taken");
        }
        Member member = createUser(signUpRequest, Role.MEMBER);


        return createTokenResponse(member);
    }

    public String upgradeMember(String memberId, AuthRequest signUpRequest) {
        String validationError = InputValidator.isValidPhoneNumber(truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum())) ? null : "Invalid phone number format";
        if (validationError != null) {
            throw new InvalidRequestException(validationError);
        }

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        if (member.getRole() != Role.MEMBER) {
            throw new InvalidRequestException("Member can only upgrade their account once");
        }

        updateMemberDetails(member, signUpRequest);

        memberRepository.save(member);
        if (member.getRole() == Role.ENTERPRISE) {
            return "Send request to admin for approval";
        }
        return "Candidate account upgraded successfully";
    }

    private void updateMemberDetails(Member member, AuthRequest signUpRequest) {
        // Set common details
        member.setName(signUpRequest.getName());
        member.setAddress(signUpRequest.getAddress());
        member.setPhoneNumber(truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum()));

        // Check if company name is provided
        if (signUpRequest.getCompanyName() != null && !signUpRequest.getCompanyName().isEmpty()) {
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

    public void approveMemberUpgrade(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        if (member.getIsValidated()) {
            throw new InvalidRequestException("Member has already been approved");
        }

        member.setIsValidated(true);
        revokeAllUserTokens(member);
        memberRepository.save(member);

    }

    @Transactional
    public void rejectMemberUpgrade(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        if (member.getIsValidated()) {
            throw new InvalidRequestException("Member has already been approved");
        }

        member.setIsValidated(false);
        member.setRole(Role.MEMBER);
        member.setName(null);
        member.setAddress(null);
        member.setPhoneNumber(null);

        memberRepository.save(member);
        enterpriseRepository.deleteByMemberId(memberId);
    }

    public TokenResponse createStaff(AuthRequest signUpRequest) {
        if (isEmailOrPhoneTaken(signUpRequest)) {
            throw new DataIntegrityViolationException("Email or username or phone number is already taken");
        }

        Member member = createUser(signUpRequest, Role.STAFF);
        return createTokenResponse(member);
    }

    public TokenResponse createPresident(AuthRequest signUpRequest) {
        if (isEmailOrPhoneTaken(signUpRequest)) {
            throw new DataIntegrityViolationException("Email or username or phone number is already taken");
        }

        Member member = createUser(signUpRequest, Role.PRESIDENT);
        return createTokenResponse(member);
    }

    private boolean isEmailOrPhoneTaken(AuthRequest signUpRequest) {
        return memberRepository.existsByEmail(signUpRequest.getEmail())
                || memberRepository.existsByPhoneNumber(signUpRequest.getPhoneNum());
    }

    private TokenResponse createTokenResponse(Member member) {
        TokenResponse response = new TokenResponse();
        var tokens = generateAndSaveTokens(member);
        response.setRole(member.getRole());
        response.setEmail(member.getUsername());
        response.setAccessToken(tokens.get("jwt"));
        response.setRefreshToken(tokens.get("refreshToken"));
        response.setIssuedAt(jwtService.getIssuedAt(tokens.get("jwt")));
        response.setExpirationTime(jwtService.getExpiration(tokens.get("jwt")));
        return response;
    }

    @Transactional
    public TokenResponse refreshToken(String refreshToken) {
        try {
            String email = jwtService.extractEmail(refreshToken);
            Member member = getUserByEmail(email);
            if (tokenRepository.findRefreshTokenByToken(refreshToken).isPresent() && jwtService.isTokenValid(refreshToken, member)) {

                // Revoke all user's access tokens
                revokeAllUserAccessTokens(member);
                return createTokenResponse(member);
            } else {
                throw new InvalidRequestException("Invalid refresh token");
            }
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal server error");
        }
    }

    public void logout(String accessToken) {
        try {
            String email = jwtService.extractEmail(accessToken);
            Member member = getUserByEmail(email);

            if (jwtService.isTokenValid(accessToken, member)) {
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

    private Member createUser(AuthRequest signUpRequest, Role role) {
        Member member = Member.builder()
                .id(generateUserID(role))
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .phoneNumber(role != Role.PRESIDENT && role != Role.STAFF ? null : truncateSpaceFromPhoneNumber(signUpRequest.getPhoneNum()))
                .name(role != Role.PRESIDENT && role != Role.STAFF ? null : signUpRequest.getName())
                .address(role != Role.PRESIDENT && role != Role.STAFF ? null : signUpRequest.getAddress())
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
        String prefix;
        Optional<String> latestIdOpt = switch (role) {
            case CANDIDATE -> {
                prefix = "CA";
                yield candidateRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Candidate::getId);
            }
            case ENTERPRISE -> {
                prefix = "EN";
                yield enterpriseRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Enterprise::getId);
            }
            case PRESIDENT -> {
                prefix = "PR";
                yield memberRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Member::getId);
            }
            case STAFF -> {
                prefix = "ST";
                yield memberRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Member::getId);
            }
            case MEMBER -> {
                prefix = "ME";
                yield memberRepository.findFirstByIdStartsWithOrderByIdDesc(prefix)
                        .map(Member::getId);
            }
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        };

        return prefix + String.format("%03d", latestIdOpt.map(id -> Integer.parseInt(id.substring(2)) + 1).orElse(1));
    }

    private String validateSignUpRequest(AuthRequest signUpRequest) {
        if (!InputValidator.isValidEmail(signUpRequest.getEmail())) {
            return "Invalid email format";
        }

        if (!InputValidator.isValidPassword(signUpRequest.getPassword())) {
            return "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers, and special characters";
        }
        return null;
    }

    private String truncateSpaceFromPhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("\\s+", "");
    }

    public String updateMember(String id, AuthRequest updateRequest) {
        if (updateRequest == null) {
            throw new IllegalArgumentException("Update request cannot be null");
        }
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        if (updateRequest.getName() != null) {
            member.setName(updateRequest.getName());
        }
        if (updateRequest.getAddress() != null) {
            member.setAddress(updateRequest.getAddress());
        }
        if (updateRequest.getPhoneNum() != null) {
            String validationError = InputValidator.isValidPhoneNumber(truncateSpaceFromPhoneNumber(updateRequest.getPhoneNum())) ? null : "Invalid phone number format";
            if (validationError != null) {
                throw new InvalidRequestException(validationError);
            }

            member.setPhoneNumber(truncateSpaceFromPhoneNumber(updateRequest.getPhoneNum()));
        }

        if (updateRequest.getTaxCode() != null || updateRequest.getCompanyName() != null) {
            Enterprise enterprise = enterpriseRepository.findByMemberId(id);
            if (enterprise == null) {
                throw new ResourceNotFoundException("Enterprise not found");
            }
            if (updateRequest.getTaxCode() != null) {
                enterprise.setTaxCode(updateRequest.getTaxCode());
            }
            if (updateRequest.getCompanyName() != null) {
                enterprise.setCompanyName(updateRequest.getCompanyName());
            }
            enterprise.setMember(member);
            enterpriseRepository.save(enterprise);
        }


        memberRepository.save(member);
        return "Member updated successfully";
    }
}
