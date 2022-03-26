package com.tuiasi.Gateway.soap.auth.podcast.login;

import javax.xml.bind.annotation.*;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "token",
    "errorMessage"
})
@XmlRootElement(name = "loginResponse")
public class LoginResponse {

    @XmlElement(required = true)
    protected String token;
    @XmlElement(required = true)
    protected String errorMessage;

    public String getToken() {
        return token;
    }

    public void setToken(String value) {
        this.token = value;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String value) {
        this.errorMessage = value;
    }

}
