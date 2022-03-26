package com.tuiasi.PodcastScheduleService.programari;

import lombok.Data;

import javax.persistence.*;
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
    private Date dataStart;
    private Date dataStop;
    private String scop;
    private String stare;
    private String tip;
}
