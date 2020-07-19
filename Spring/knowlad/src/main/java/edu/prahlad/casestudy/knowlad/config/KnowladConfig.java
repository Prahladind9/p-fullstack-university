package edu.prahlad.casestudy.knowlad.config;


import edu.prahlad.casestudy.knowlad.loader.YamlPropertyLoaderFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.scheduling.annotation.EnableAsync;

import javax.sql.DataSource;

@Configuration
@PropertySource(
        value = "file:${PROPERTY_PATH}",
        factory = YamlPropertyLoaderFactory.class)
@EnableAsync
public class KnowladConfig {

    @Value("${knowlad.datasource.url}")
    public String dataSourceUrl;

    @Value("${knowlad.datasource.username}")
    public String dataSourceUsername;

    @Value("${knowlad.datasource.password}")
    public String dataSourcePassword;

    @Value("${knowlad.datasource.driver}")
    public String dataSourceDriver;

    @Value("${knowlad.threadPoolTaskExecutor.maxPoolSize}")
    public Integer maxPoolSize;

    @Value("${knowlad.threadPoolTaskExecutor.corePoolSize}")
    public Integer corePoolSize;

    @Value("${knowlad.threadPoolTaskExecutor.queueCapacity}")
    public Integer queueCapacity;


    @Value("${knowlad.applicationName}")
    public String applicationName;


    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(dataSourceDriver);
        dataSource.setUrl(dataSourceUrl);
        dataSource.setUsername(dataSourceUsername);
        dataSource.setPassword(dataSourcePassword);
        return dataSource;
    }
}