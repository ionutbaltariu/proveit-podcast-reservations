package com.tuiasi.PersonalInformationService.personalInformation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserDataController {

    private final UserDataRepository userDataRepository;

    public UserDataController(UserDataRepository userDataRepository) {
        this.userDataRepository = userDataRepository;
    }

    @GetMapping("/api/users/{idUser}")
    ResponseEntity<UserData> getUserData(@PathVariable long idUser){
        try {
            return ResponseEntity.ok(userDataRepository.findUserById(idUser));
        }
        catch(Exception ignored){
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/api/users")
    ResponseEntity<Object> addUserData(@RequestBody UserData userData){
        try{
            userDataRepository.save(userData);
            return ResponseEntity.ok("204");
        }
        catch(Exception ignored){
        }
        return ResponseEntity.badRequest().build();
    }
}
