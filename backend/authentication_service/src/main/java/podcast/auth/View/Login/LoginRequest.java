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
        "username",
        "password"
})
@XmlRootElement(name = "loginRequest")
@Getter
@Setter
public class LoginRequest {
    @XmlElement(required = true)
    protected String username;
    @XmlElement(required = true)
    protected String password;
}
