package com.tuiasi.Gateway.connector;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class SOAPClientConfig {

    @Bean
    public Jaxb2Marshaller marshaller(){
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();

        marshaller.setContextPaths(
                "com.tuiasi.Gateway.soap.auth.podcast.validate",
                "com.tuiasi.Gateway.soap.auth.podcast.login",
                "com.tuiasi.Gateway.soap.auth.podcast.register");

        return marshaller;
    }

    @Bean
    public SOAPClient validationClient(Jaxb2Marshaller marshaller){
        SOAPClient validationClient = new SOAPClient();
        validationClient.setDefaultUri("http://localhost:9090/ws/");
        validationClient.setMarshaller(marshaller);
        validationClient.setUnmarshaller(marshaller);
        return validationClient;
    }
}
