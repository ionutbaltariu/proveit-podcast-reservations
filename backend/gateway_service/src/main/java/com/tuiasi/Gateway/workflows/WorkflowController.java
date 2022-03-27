package com.tuiasi.Gateway.workflows;

import com.tuiasi.Gateway.connector.SOAPClient;
import com.tuiasi.Gateway.models.Notificare;
import com.tuiasi.Gateway.models.UserDetails;
import com.tuiasi.Gateway.models.UserDetailsFull;
import com.tuiasi.Gateway.soap.auth.podcast.login.LoginResponse;
import com.tuiasi.Gateway.soap.auth.podcast.validate.ValidateResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@SuppressWarnings("FieldCanBeLocal")
@RestController
@CrossOrigin("*")
public class WorkflowController {

    @Autowired
    RestTemplate restTemplate;

    private final String podcastScheduleService = "http://localhost:6060";
    private final String personalInformationService = "http://localhost:5050";
    private final String notificationService = "http://localhost:4040";
    private final String ticketService = "http://localhost:3030";

    private final Logger log = LoggerFactory.getLogger(WorkflowController.class);

    @Autowired
    SOAPClient soapClient;

    ValidateResponse validate(String token) {
        return soapClient.getValidationResponse(token);
    }

    String login(String username, String password) {
        return soapClient.getLoginResponse(username, password).getToken();
    }

    String register(String username, String password) {
        return soapClient.getRegisterResponse(username, password).getStatus();
    }

    @RequestMapping("/api/podcast/programari/**")
    public ResponseEntity < Object > programari(HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization");

        if (Objects.equals(request.getMethod(), "GET")) {
            return restTemplate.getForEntity(podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""), Object.class);
        } else {

            if (Objects.equals(request.getMethod(), "POST")) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                String requestData = request.getReader().lines().collect(Collectors.joining());
                HttpEntity < Object > body = new HttpEntity < > (requestData, headers);
                String url = podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : "");

                try {
                    ResponseEntity < Object > response = restTemplate.exchange(url, Objects.requireNonNull(HttpMethod.resolve(request.getMethod())), body, Object.class);
                    ValidateResponse validateResponse = validate(token.split(" ")[1]);
                    String role = validateResponse.getRole();
                    String userId = validateResponse.getStatus();

                    if (Objects.equals(role, "student")) {
                        UserDetailsFull admin = restTemplate.getForEntity(personalInformationService + "/api/users/" + userId + "/coordinator", UserDetailsFull.class).getBody();
                        UserDetailsFull user = restTemplate.getForEntity(personalInformationService + "/api/users/" + userId, UserDetailsFull.class).getBody();

                        assert admin != null;
                        String emailAdmin = admin.getEmail();
                        assert user != null;
                        String emailUser = user.getEmail();

                        int idAdmin = admin.getIdUser();
                        int idUser = user.getIdUser();
                        Notificare notificare = new Notificare(emailUser, emailAdmin, idUser, idAdmin, LocalDateTime.now());

                        HttpEntity < Object > bodyNotificare = new HttpEntity < > (notificare, headers);
                        restTemplate.exchange(notificationService + "/api/notificari/", HttpMethod.POST, bodyNotificare, Object.class);
                    }
                    return response;
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("{\"mesaj\":\"Eroare la crearea rezervarii\"}");
                }
            }

            if ("DELETE".equals(request.getMethod())) {
                try {
                    restTemplate.delete(podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""));
                    return ResponseEntity.ok().build();
                } catch (Exception e) {
                    return ResponseEntity.notFound().build();
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"mesaj\":\"Access Forbidden\"}");
        }
    }

    @RequestMapping("/api/podcast/sali/**")
    public ResponseEntity < Object > sali(HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization");

        if (Objects.equals(request.getMethod(), "GET")) {
            return restTemplate.getForEntity(podcastScheduleService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""), Object.class);
        } else {
            String role;
            try {
                role = validate(token.split(" ")[1]).getRole();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{\"mesaj\":\"Access Forbidden\"}");
            }

            if ("admin".equals(role)) {
                if (Objects.equals(request.getMethod(), "POST")) {
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    String requestData = request.getReader().lines().collect(Collectors.joining());
                    HttpEntity < Object > body = new HttpEntity < > (requestData, headers);
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
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"mesaj\":\"Access Forbidden\"}");
        }
    }

    @GetMapping("/api/validate")
    private ResponseEntity < Object > validate(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        ValidateResponse validateResponse = validate(token.split(" ")[1]);
        String idUser = validateResponse.getStatus();
        String rol = validateResponse.getRole();
        UserDetails userInfo = new UserDetails(rol, idUser);
        return ResponseEntity.ok(userInfo);
    }

    @RequestMapping("/api/users/**")
    private ResponseEntity < Object > getUserInformation(HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization");
        ValidateResponse validateResponse = validate(token.split(" ")[1]);
        String idUser = validateResponse.getStatus();
        String rol = validateResponse.getRole();
        if (Objects.equals(request.getMethod(), "GET")) {
            return restTemplate.getForEntity(personalInformationService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""), Object.class);
        }
        if (Objects.equals(request.getMethod(), "POST")) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String requestData = request.getReader().lines().collect(Collectors.joining());
            HttpEntity < Object > body = new HttpEntity < > (requestData, headers);
            String url = personalInformationService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : "");
            return restTemplate.exchange(url, Objects.requireNonNull(HttpMethod.resolve(request.getMethod())), body, Object.class);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/api/authenticate")
    private ResponseEntity < Object > authenticate(@RequestBody Map < String, String > user) {
        HashMap < String, String > map = new HashMap < > ();
        String token;
        try {
            token = login(user.get("username"), user.get("password"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"mesaj\":\"Eroare la autentificare\"}");
        }
        if (token != null && !token.equals("")) {
            map.put("token", token);
            return ResponseEntity.ok(map);
        }
        return ResponseEntity.badRequest().body("{\"mesaj\":\"Eroare la autentificare\"}");
    }

    @PostMapping("/api/register/admin")
    private ResponseEntity < Object > registerAdmin(@RequestBody Map < String, String > user, @RequestHeader("Authorization") String authorization) {
        String role;
        try {
            role = validate(authorization.split(" ")[1]).getRole();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"mesaj\":\"Eroare la autentificare\"}");
        }
        if (Objects.equals(role, "admin")) {
            // 201 - change to 201
            return ResponseEntity.ok(register(user.get("username"), user.get("password")));
        }
        return ResponseEntity.badRequest().body("{\"mesaj\":\"Eroare la autentificare\"}");
    }

    @PostMapping("/api/register/student")
    private ResponseEntity < Object > registerStudent(@RequestBody Map < String, String > user) {
        String response = register(user.get("username"), user.get("password"));
        if(Objects.equals(response, "200 : Registration succesful")){
            String token = login(user.get("username"), user.get("password"));
            ValidateResponse validateResponse = validate(token);
            String idUser = validateResponse.getStatus();
            String rol = validateResponse.getRole();
            UserDetailsFull newUser = new UserDetailsFull(Integer.parseInt(idUser), user.get("telefon"), user.get("facultate"), user.get("email"), rol);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity < Object > body = new HttpEntity < > (newUser, headers);
            String url = personalInformationService + "/api/users";
            restTemplate.exchange(url, HttpMethod.POST, body, Object.class);
        }
        return ResponseEntity.ok(response);
    }

    @RequestMapping("/api/notificari/**")
    private ResponseEntity < Object > notifications() {
        return ResponseEntity.ok("200");
    }

    @RequestMapping("/api/tichete/**")
    private ResponseEntity < Object > tichete(HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization");
        ValidateResponse validateResponse = validate(token.split(" ")[1]);
        String rol = validateResponse.getRole();
        boolean checkUser = Objects.equals(rol, "student") || Objects.equals(rol, "admin");
        System.out.println("Is in functie");
        if (Objects.equals(request.getMethod(), "GET") && checkUser) {
            return restTemplate.getForEntity(ticketService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : ""), Object.class);
        }
        if (Objects.equals(request.getMethod(), "POST") && checkUser) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String requestData = request.getReader().lines().collect(Collectors.joining());
            HttpEntity < Object > body = new HttpEntity < > (requestData, headers);
            String url = ticketService + request.getRequestURI() + (request.getQueryString() != null ? ("?" + request.getQueryString()) : "");
            return restTemplate.exchange(url, Objects.requireNonNull(HttpMethod.resolve(request.getMethod())), body, Object.class);
        }
        return ResponseEntity.badRequest().build();
    }

}