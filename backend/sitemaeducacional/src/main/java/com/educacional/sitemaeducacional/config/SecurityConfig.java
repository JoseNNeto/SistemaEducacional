package com.educacional.sitemaeducacional.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(toH2Console()).permitAll()
                
                .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()

                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .permitAll() 
                .defaultSuccessUrl("/conteudos", true) 
            )

            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout") 
                .permitAll()
            )

            .csrf(csrf -> csrf
                .ignoringRequestMatchers(toH2Console())
            )
            .headers(headers -> headers
                .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin) 
            );

        return http.build();
    }
}
