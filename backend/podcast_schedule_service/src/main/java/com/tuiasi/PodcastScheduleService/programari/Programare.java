package com.tuiasi.PodcastScheduleService.programari;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="programari")
public class Programare {
    @Id
    @GeneratedValue
    private Long idProgramare;
    private int idSala;
    private int idUser;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dataStart;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dataStop;
    private String scop;
    private String stare;
    private String tip;
}
