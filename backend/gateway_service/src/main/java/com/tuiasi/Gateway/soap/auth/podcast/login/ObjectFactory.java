package com.tuiasi.Gateway.soap.auth.podcast.login;

import javax.xml.bind.annotation.XmlRegistry;

@XmlRegistry
public class ObjectFactory {

    public ObjectFactory() {
    }

    public LoginRequest createLoginRequest() {
        return new LoginRequest();
    }

    public LoginResponse createLoginResponse() {
        return new LoginResponse();
    }

}
