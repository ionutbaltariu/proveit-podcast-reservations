package com.tuiasi.PersonalInformationService.personalInformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface UserDataRepository extends JpaRepository<UserData, Long> {

    @Query(value="SELECT * FROM informatii_personale WHERE idUser=?1", nativeQuery = true)
    UserData findUserById(long idUser);

    @Query(value="SELECT facultate FROM informatii_personale WHERE idUser=?1", nativeQuery = true)
    String getFacultyByUserId(long idUser);

    @Query(value="SELECT * FROM informatii_personale WHERE facultate=?1 AND rol='admin'", nativeQuery = true)
    UserData findCoordinatorByFaculty(String faculty);

    @Query(value="SELECT * FROM informatii_personale WHERE rol='admin'", nativeQuery = true)
    List<UserData> findAllCoordinators();

    @Transactional
    @Modifying
    @Query(value="INSERT INTO informatii_personale VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
    void addDatePersonale();
}
