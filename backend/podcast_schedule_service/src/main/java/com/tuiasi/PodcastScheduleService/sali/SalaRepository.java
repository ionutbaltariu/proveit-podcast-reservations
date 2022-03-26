package com.tuiasi.PodcastScheduleService.sali;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SalaRepository extends JpaRepository<Sala, Long> {

    @Query(value="SELECT * FROM sali", nativeQuery = true)
    List<Sala> findAll();
}
