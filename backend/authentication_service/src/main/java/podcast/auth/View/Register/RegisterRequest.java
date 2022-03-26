package podcast.auth.View.Register;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.*;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "username",
        "password"
})
@XmlRootElement(name = "registerRequest")
@Getter
@Setter
public class RegisterRequest {

    @XmlElement(required = true)
    protected String username;
    @XmlElement(required = true)
    protected String password;
}
