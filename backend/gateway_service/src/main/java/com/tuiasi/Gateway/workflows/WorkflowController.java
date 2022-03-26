package com.tuiasi.Gateway.workflows;

import com.tuiasi.Gateway.connector.SOAPClient;
import com.tuiasi.Gateway.models.UserDetails;
import com.tuiasi.Gateway.soap.auth.podcast.validate.ValidateResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@SuppressWarnings("FieldCanBeLocal")
@RestController
@CrossOrigin("http://localhost:3001")
public class WorkflowController {

    @Autowired
    RestTemplate restTemplate;

    private final String podcastScheduleService = "http://localhost:8080";
    private final Logger log = LoggerFactory.getLogger(WorkflowController.class);

    @Autowired
    SOAPClient soapClient;

    ValidateResponse validate(String token){
        return soapClient.getValidationResponse(token);
    }

    String login(String username, String password){
        return soapClient.getLoginResponse(username, password).getToken();
    }

    String register(String username, String password){
        return soapClient.getRegisterResponse(username, password).getStatus();
    }

    @RequestMapping("/api/programari/**")
    public ResponseEntity<Object> foo(HttpServletRequest request) throws IOException {
        // String restOfTheUrl = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        String token = request.getHeader("Authorization");

        if(Objects.equals(request.getMethod(), "GET")){
            return restTemplate.getForEntity(podcastScheduleService + request.getRequestURI() + (request.getQueryString()!= null ? ("?" + request.getQueryString()) : "") , Object.class);
        }
        else{
            String role;
            try{
                role = validate(token.split(" ")[1]).getRole();
            } catch(Exception e){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Forbidden");
            }

            if ("moderator".equals(role)) {
                switch (request.getMethod()) {
                    case "PUT":
                    case "POST":
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_JSON);
                        String requestData = request.getReader().lines().collect(Collectors.joining());
                        HttpEntity<Object> body = new HttpEntity<>(requestData, headers);
                        String url = podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : "");
                        return restTemplate.exchange(url, Objects.requireNonNull(HttpMethod.resolve(request.getMethod())), body, Object.class);
                }
                if ("DELETE".equals(request.getMethod())) {
                    try {
                        restTemplate.delete(podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""));
                        return ResponseEntity.ok().build();
                    } catch (Exception e) {
                        return ResponseEntity.notFound().build();
                    }
                }
                if (Objects.equals(request.getMethod(), "OPTIONS")) {
                    return ResponseEntity.ok(restTemplate.exchange(podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""),
                            HttpMethod.OPTIONS, null, Object.class).getBody());
                }
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Forbidden");
        }
    }

    @GetMapping("api/validate")
    private ResponseEntity<Object> validate(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        ValidateResponse validateResponse = validate(token.split(" ")[1]);
        String response = validateResponse.getStatus();
        String rol = validateResponse.getRole();
        UserDetails userInfo = new UserDetails(response.split(" ")[3], rol, response.split(" ")[2], response.split(" ")[1], response.split(" ")[0]);

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("api/authenticate")
    private ResponseEntity<Object> authenticate(@RequestBody Map<String,String> user){
        HashMap<String, String> map = new HashMap<>();
        String token;
        try{
            token = login(user.get("username"), user.get("password"));
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Eroare la autentificare");
        }
        if(token != null && !token.equals("")){
            map.put("token", token);
            return ResponseEntity.ok(map);
        }
        return ResponseEntity.badRequest().body("Eroare la autentificare");
    }

    @PostMapping("api/register")
    private ResponseEntity<Object> register(@RequestBody Map<String,String> user, @RequestHeader("Authorization") String authorization){
        String role;
        return ResponseEntity.ok(register(user.get("username"), user.get("password")));
//        try{
//            role = validate(authorization.split(" ")[1]).getRole();
//        }catch(Exception e){
//            return ResponseEntity.badRequest().body("Eroare la autentificare");
//        }
//        if(Objects.equals(role, "moderator")){
//            // 201 - change to 201
//            return ResponseEntity.ok(register(user.get("username"), user.get("password")));
//        }
//        return ResponseEntity.badRequest().body("Eroare la autentificare");
    }

}
