package com.educacional.sitemaeducacional.config; // Ou teu pacote de configuração

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console; // Importante!

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers(toH2Console()).permitAll() // Libera o H2 Console
                    // Adiciona aqui outras regras de autorização, por exemplo:
                    // .requestMatchers("/api/public/**").permitAll()
                    // .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated() // Exige autenticação para qualquer outra requisição
            )
            .csrf(csrf -> csrf
                .ignoringRequestMatchers(toH2Console()) // Desabilita CSRF pro H2 Console (necessário)
                // Adiciona aqui outros requestMatchers para ignorar CSRF se precisar
            )
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.sameOrigin()) // Permite que o H2 Console seja embutido em frames (necessário)
            );
            // Adiciona aqui outras configurações de segurança, como formLogin, etc.
            // http.formLogin(withDefaults()); // Exemplo de login com formulário padrão

        return http.build();
    }
}