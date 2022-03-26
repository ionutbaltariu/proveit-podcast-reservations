package com.tuiasi.Gateway.soap.auth.podcast.validate;

import javax.xml.bind.annotation.XmlRegistry;

@XmlRegistry
public class ObjectFactory {

    public ObjectFactory() {
    }

    public ValidateRequest createValidateRequest() {
        return new ValidateRequest();
    }

    public ValidateResponse createValidateResponse() {
        return new ValidateResponse();
    }

}
