package com.tuiasi.Gateway.models;

import lombok.Data;
import java.util.Date;

@Data
public class Programare {
    private Long idProgramare;
    private int idSala;
    private int idUser;
    private Date dataStart;
    private Date dataStop;
    private String scop;
    private String stare;
    private String tip;
}
