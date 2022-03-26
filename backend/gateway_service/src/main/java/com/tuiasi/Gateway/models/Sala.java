package com.tuiasi.Gateway.models;

import lombok.Data;

@Data
public class Sala {
    private Long idSala;
    private String nume;
    private String cod;
    private int capacitate;
    private int oraStart;
    private int oraStop;
    private String disponibilitate;
}
