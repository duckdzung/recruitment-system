package com.duckdzung.recruitmentsystem.security.config;

import com.duckdzung.recruitmentsystem.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Autowired
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private final UserDetailsService userDetailsService;
    @Autowired
    @Qualifier("delegatedAuthenticationEntryPoint")
    private final AuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request ->
                        request.requestMatchers("**/auth/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "**/recruitments/**").hasAuthority("ENTERPRISE")
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "**/recruitments/**").hasAuthority("ENTERPRISE")
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "**/recruitments/**").hasAnyAuthority("ENTERPRISE", "STAFF")
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/recruitments/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/nominees/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/enterprises/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/members/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "**/members/**").hasAuthority("STAFF")
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "**/feedback/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/profiles/**").hasAnyAuthority("CANDIDATE", "STAFF")
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "**/profiles/**").hasAuthority("CANDIDATE")
                                .requestMatchers(
                                        HttpMethod.PATCH,
                                        "**/profiles/**").hasAuthority("STAFF")
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "**/profiles/**").hasAuthority("CANDIDATE")
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "**/profiles/**").hasAnyAuthority("CANDIDATE", "STAFF")
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/candidates/**").hasAuthority("STAFF")
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "**/application-form/**").hasAuthority("CANDIDATE")
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "**/application-form/**").hasAuthority("STAFF")
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "**/application-form/**").hasAuthority("STAFF")
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/application-form/**").hasAnyAuthority("CANDIDATE", "STAFF")
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "**/reports/**").hasAnyAuthority("PRESIDENT", "STAFF")
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "**/reports/**").hasAuthority("PRESIDENT")
                                .requestMatchers(
                                        HttpMethod.PATCH,
                                        "**/reports/**").hasAuthority("STAFF")
                                .anyRequest().authenticated()
                )
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(handler -> handler.authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler)
                )
        ;

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
