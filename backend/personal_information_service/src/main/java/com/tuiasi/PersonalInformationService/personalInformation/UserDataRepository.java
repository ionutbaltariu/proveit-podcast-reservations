package com.tuiasi.PersonalInformationService.personalInformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDataRepository extends JpaRepository<UserData, Long> {

    @Query(value="SELECT * FROM informatii_personale WHERE idUser=?1", nativeQuery = true)
    UserData findUserById(long idUser);

}
