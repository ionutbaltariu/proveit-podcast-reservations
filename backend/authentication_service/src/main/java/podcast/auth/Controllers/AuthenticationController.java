package podcast.auth.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import podcast.auth.AuthenticatorLogic.Jwt.JwtTokenUtil;
import podcast.auth.AuthenticatorLogic.JwtUserDetailsService;
import podcast.auth.AuthenticatorLogic.User.User;
import podcast.auth.View.Login.LoginRequest;
import podcast.auth.View.Login.LoginResponse;
import podcast.auth.View.Register.RegisterRequest;
import podcast.auth.View.Validate.ValidateRequest;
import podcast.auth.View.Validate.ValidateResponse;
import podcast.auth.AuthenticatorLogic.User.UserDTO;
import podcast.auth.View.Register.RegisterResponse;

@SuppressWarnings("unused")
@Endpoint
public class AuthenticationController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PayloadRoot(namespace = "http://podcast.auth/login", localPart = "loginRequest")
    @ResponsePayload
    public LoginResponse login(@RequestPayload LoginRequest input) throws Exception {
        LoginResponse response = new LoginResponse();
        try {
            authenticate(input.getUsername(), input.getPassword());
            final User userDetails = userDetailsService.loadUserByUsername(input.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            response.setToken(token);
            response.setErrorMessage("");
            return response;
        }
        catch(Exception e){
            response.setToken("");
            response.setErrorMessage(e.getMessage());
            return response;
        }
    }

    @PayloadRoot(namespace = "http://podcast.auth/register", localPart = "registerRequest")
    @ResponsePayload
    public RegisterResponse register(@RequestPayload RegisterRequest input) {
        RegisterResponse response = new RegisterResponse();
        try {
            UserDTO user = new UserDTO();
            user.setUsername(input.getUsername());
            user.setPassword(input.getPassword());
            user.setRole("student");
            userDetailsService.save(user);
            response.setStatus("200 : Registration succesful");
            response.setErrorMessage("");
            return response;
        }
        catch(Exception e){
            response.setStatus("400");
            response.setErrorMessage(e.getMessage());
            return response;
        }
    }

    @PayloadRoot(namespace = "http://podcast.auth/validate", localPart = "validateRequest")
    @ResponsePayload
    public ValidateResponse validateToken(@RequestPayload ValidateRequest input) {
        ValidateResponse response = new ValidateResponse();
        try{
            if(!jwtTokenUtil.isTokenExpired(input.getToken())){
                response.setRole(jwtTokenUtil.getRoleClaimFromToken(input.getToken()));
                String idUser = jwtTokenUtil.getSubjectClaimFromToken(input.getToken());
                String facUser = jwtTokenUtil.getFacClaimFromToken(input.getToken());
                String telUser = jwtTokenUtil.getTelClaimFromToken(input.getToken());
                String emailUser = jwtTokenUtil.getEmailClaimFromToken(input.getToken());
                response.setStatus(idUser + " " + facUser + " " + telUser + " " + emailUser);
            }
            else{
                response.setRole("");
                response.setStatus("Invalid token");
            }
            return response;
        }
        catch(Exception e){
            System.out.println(e.toString());
            response.setRole("none");
            response.setStatus("400");
            return response;
        }
    }
}
