package com.tuiasi.Gateway.soap.auth.podcast.validate;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "status",
    "role"
})
@XmlRootElement(name = "validateResponse")
public class ValidateResponse {

    @XmlElement(required = true)
    protected String status;
    @XmlElement(required = true)
    protected String role;

    public String getStatus() {
        return status;
    }

    public void setStatus(String value) {
        this.status = value;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String value) {
        this.role = value;
    }

}
