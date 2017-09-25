package org.dougllas.springboot.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Created by DOUGLLAS SOUSA on 20/09/2017.
 */

@SpringBootApplication
@EnableAutoConfiguration
@EntityScan("org.dougllas.springboot.model")
@ComponentScan(basePackages = "org.dougllas")
@EnableJpaRepositories(basePackages = "org.dougllas.springboot.repository")
public class SpringConfiguration {

    public static void main(String[] args) {
        SpringApplication.run(SpringConfiguration.class, args);
    }

}