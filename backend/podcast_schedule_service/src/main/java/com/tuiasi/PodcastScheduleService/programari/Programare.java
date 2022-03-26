package com.tuiasi.PodcastScheduleService.programari;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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
