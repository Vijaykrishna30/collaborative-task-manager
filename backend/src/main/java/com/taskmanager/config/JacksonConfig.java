package com.taskmanager.config;

import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public Hibernate6Module hibernate6Module() {
        Hibernate6Module hibernateModule = new Hibernate6Module();
        hibernateModule.disable(Hibernate6Module.Feature.USE_TRANSIENT_ANNOTATION);
        return hibernateModule;
    }
}
