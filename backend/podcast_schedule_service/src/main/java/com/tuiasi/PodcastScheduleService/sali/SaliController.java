package com.tuiasi.PodcastScheduleService.sali;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SaliController {

    private final SalaRepository salaRepository;

    public SaliController(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    @GetMapping("/sali")
    ResponseEntity<List<Sala>> getSali(){
        return ResponseEntity.ok(salaRepository.findAll());
    }

}
