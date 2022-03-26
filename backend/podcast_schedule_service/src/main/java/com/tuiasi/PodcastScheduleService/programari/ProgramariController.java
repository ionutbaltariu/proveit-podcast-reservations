package com.tuiasi.PodcastScheduleService.programari;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProgramariController {
    private final ProgramareRepository programareRepository;

    public ProgramariController(ProgramareRepository programareRepository) {
        this.programareRepository = programareRepository;
    }

    @GetMapping("/api/podcast/programari")
    ResponseEntity<List<Programare>> getProgramari(
            @Nullable @RequestParam String tip,
            @Nullable @RequestParam String stare,
            @Nullable @RequestParam Integer idSala){
        if(tip != null){
            ResponseEntity.ok(programareRepository.findByTip(tip));
        }
        if(stare != null){
            ResponseEntity.ok(programareRepository.findByStare(stare));
        }
        if(idSala != null){
            ResponseEntity.ok(programareRepository.findByIdSala(idSala));
        }

        return ResponseEntity.ok(programareRepository.findAll());

    }

    @PostMapping("/api/podcast/programari")
    ResponseEntity<Object> addProgramare(@RequestBody Programare programare){
        int value = programareRepository.checkRezervari(programare.getDataStart(), programare.getDataStop());
        if(value==0) {
            programareRepository.insertProgramare(programare.getIdSala(), programare.getIdUser(), programare.getDataStart(), programare.getDataStop(), programare.getScop(), programare.getStare(), programare.getTip());
            return ResponseEntity.ok("204");
        }
        else {
            return ResponseEntity.badRequest().body("{\"mesaj\":\"Eroare la crearea rezervarii\"}");
        }
    }
}
