package com.tuiasi.PodcastScheduleService.programari;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProgramareRepository extends JpaRepository<Programare, Long> {

    @Query(value="SELECT * FROM programari", nativeQuery = true)
    List<Programare> findAll();

}
