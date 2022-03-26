package com.tuiasi.Gateway.soap.auth.podcast.validate;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "token"
})
@XmlRootElement(name = "validateRequest")
public class ValidateRequest {

    @XmlElement(required = true)
    protected String token;

    public String getToken() {
        return token;
    }

    public void setToken(String value) {
        this.token = value;
    }

}
