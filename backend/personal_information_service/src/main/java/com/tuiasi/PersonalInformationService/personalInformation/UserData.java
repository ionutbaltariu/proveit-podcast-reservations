package com.tuiasi.PersonalInformationService.personalInformation;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="informatii_personale")
public class UserData {
    @Id
    private Long idUser;
    private String telefon;
    private String facultate;
    private String email;
    private String rol;

    public UserData(){

    }
}
