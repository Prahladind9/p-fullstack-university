package edu.prahlad.casestudy.knowlad.utility;

import edu.prahlad.casestudy.knowlad.loader.YamlPropertyLoaderFactory;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Getter
@Configuration
@PropertySource(
        value = "file:${PROPERTY_PATH}",
        factory = YamlPropertyLoaderFactory.class)
public class KnowladUtility {

    @Value("${knowlad.passMarks}")
    public int passMarks;
}
