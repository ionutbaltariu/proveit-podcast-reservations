package com.tuiasi.Gateway.soap.auth.podcast.register;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "status",
    "errorMessage"
})
@XmlRootElement(name = "registerResponse")
public class RegisterResponse {

    @XmlElement(required = true)
    protected String status;
    @XmlElement(required = true)
    protected String errorMessage;

    public String getStatus() {
        return status;
    }

    public void setStatus(String value) {
        this.status = value;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String value) {
        this.errorMessage = value;
    }

}
