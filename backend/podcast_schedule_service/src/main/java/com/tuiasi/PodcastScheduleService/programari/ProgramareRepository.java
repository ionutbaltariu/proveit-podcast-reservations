package com.tuiasi.PodcastScheduleService.programari;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ProgramareRepository extends JpaRepository<Programare, Long> {

    @Query(value="SELECT * FROM programari", nativeQuery = true)
    List<Programare> findAll();

    @Query(value="SELECT COUNT(*) FROM programari WHERE (dataStart<=?2) AND (dataStop>=?1)", nativeQuery = true)
    int checkRezervari(LocalDateTime dataStart, LocalDateTime dataStop);

    @Transactional
    @Modifying
    @Query(value="INSERT INTO programari(idSala, idUser, dataStart, dataStop, scop, stare, tip) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)", nativeQuery = true)
    void insertProgramare(int idSala, int idUser, LocalDateTime dataStart, LocalDateTime dataStop, String scop, String stare, String tip);

    @Query(value="SELECT * FROM programari WHERE tip=?1", nativeQuery = true)
    List<Programare> findByTip(String tip);

    @Query(value="SELECT * FROM programari WHERE stare=?1", nativeQuery = true)
    List<Programare> findByStare(String stare);

    @Query(value="SELECT * FROM programari WHERE idSala=?1", nativeQuery = true)
    List<Programare> findByIdSala(Integer idSala);
}
