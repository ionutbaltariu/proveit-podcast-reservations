package podcast.auth.View.Login;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "token", "errorMessage"
})
@XmlRootElement(name = "loginResponse")
@Getter
@Setter
public class LoginResponse {

    @XmlElement(required = true)
    protected String token;

    @XmlElement(required = true)
    protected String errorMessage;
}
