package com.tuiasi.PodcastScheduleService.sali;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="sali")
public class Sala {
    @Id
    @GeneratedValue
    private Long idSala;
    private String nume;
    private String cod;
    private int capacitate;
    private int oraStart;
    private int oraStop;
    private String disponibilitate;

}
