package com.tuiasi.PodcastScheduleService.programari;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProgramariController {
    private final ProgramareRepository programareRepository;

    public ProgramariController(ProgramareRepository programareRepository) {
        this.programareRepository = programareRepository;
    }

    @GetMapping("/api/podcast/programari")
    ResponseEntity<List<Programare>> getProgramari(){
        return ResponseEntity.ok(programareRepository.findAll());
    }

    @PostMapping("/api/podcast/programari")
    ResponseEntity<Object> addProgramare(@RequestBody Programare programare){
        programareRepository.save(programare);
        return ResponseEntity.ok("204");
    }
}
