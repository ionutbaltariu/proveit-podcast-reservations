package com.tuiasi.Gateway.connector;

import com.tuiasi.Gateway.soap.auth.podcast.login.LoginRequest;
import com.tuiasi.Gateway.soap.auth.podcast.login.LoginResponse;
import com.tuiasi.Gateway.soap.auth.podcast.register.RegisterRequest;
import com.tuiasi.Gateway.soap.auth.podcast.register.RegisterResponse;
import com.tuiasi.Gateway.soap.auth.podcast.validate.ValidateRequest;
import com.tuiasi.Gateway.soap.auth.podcast.validate.ValidateResponse;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class SOAPClient extends WebServiceGatewaySupport {
    public ValidateResponse getValidationResponse(String token){
        ValidateRequest request = new ValidateRequest();
        request.setToken(token);

        return (ValidateResponse) getWebServiceTemplate().marshalSendAndReceive(request);
    }

    public LoginResponse getLoginResponse(String username, String password){
        LoginRequest request = new LoginRequest();
        request.setUsername(username);
        request.setPassword(password);

        return (LoginResponse) getWebServiceTemplate().marshalSendAndReceive(request);
    }

    public RegisterResponse getRegisterResponse(String username, String password){
        RegisterRequest request = new RegisterRequest();
        request.setUsername(username);
        request.setPassword(password);

        return (RegisterResponse) getWebServiceTemplate().marshalSendAndReceive(request);
    }
}
