package com.tuiasi.Gateway.soap.auth.podcast.login;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "username",
        "password"
})
@XmlRootElement(name = "loginRequest")
public class LoginRequest {

    @XmlElement(required = true)
    protected String username;
    @XmlElement(required = true)
    protected String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String value) {
        this.username = value;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String value) {
        this.password = value;
    }

}
