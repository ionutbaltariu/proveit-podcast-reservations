package com.tuiasi.Gateway.soap.auth.podcast.register;

import javax.xml.bind.annotation.XmlRegistry;

@XmlRegistry
public class ObjectFactory {

    public ObjectFactory() {
    }

    public RegisterRequest createRegisterRequest() {
        return new RegisterRequest();
    }

    public RegisterResponse createRegisterResponse() {
        return new RegisterResponse();
    }

}
