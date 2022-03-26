package com.tuiasi.Gateway.models;

public class UserDetails {
    private String idUser;
    private String rol;


    public UserDetails(String rol, String idUser) {
        this.idUser = idUser;
        this.rol = rol;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }
}
