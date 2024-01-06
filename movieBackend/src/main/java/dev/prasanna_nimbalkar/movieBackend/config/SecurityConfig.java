package dev.prasanna_nimbalkar.movieBackend.config; // Adjust the package name as needed

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // If you wish to disable CSRF protection
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/v1/users/register").permitAll()
                        .requestMatchers("/api/v1/movies/**").permitAll()
                        .requestMatchers("/api/v1/**").permitAll()
                        .requestMatchers("/api/v1/users/login").permitAll()
                        .anyRequest().authenticated()
                )
//                .formLogin(form -> form
//                        .loginPage("/api/v1/users/login")
//                        .permitAll()
//                )
                .formLogin(form -> form
//                        .loginPage("/api/v1/users/login") // This is where the login page is, if you have one. If not, this could be causing the problem.
//                        .loginProcessingUrl("/api/v1/users/login") // This should be where the POST request is sent for login.
                        .permitAll()
                )

                .logout(logout -> logout
                        .permitAll()
                        );

        return http.build();
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
