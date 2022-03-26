package com.tuiasi.PersonalInformationService.personalInformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDataRepository extends JpaRepository<UserData, Long> {

    @Query(value="SELECT * FROM informatii_personale WHERE idUser=?1", nativeQuery = true)
    UserData findUserById(long idUser);

    @Query(value="SELECT facultate FROM informatii_personale WHERE idUser=?1", nativeQuery = true)
    String getFacultyByUserId(long idUser);

    @Query(value="SELECT * FROM informatii_personale WHERE facultate=?1 AND rol='admin'", nativeQuery = true)
    UserData findCoordinatorByFaculty(String faculty);

}
