package com.ace.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Data
@Component
@PropertySource("classpath:jwt.properties")
public class JwtConfig {

    @Value("${jwt.access-token-validity-seconds}")
    private int tokenValiditySeconds;

    @Value("${jwt.signing-key}")
    private String signingKey;

    @Value("${jwt.token-prefix}")
    private String tokenPrefix;

    @Value("${jwt.header}")
    private String header;
}
