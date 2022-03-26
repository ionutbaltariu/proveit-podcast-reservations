package com.tuiasi.Gateway.models;

public class UserDetails {
    private String idUser;
    private String email;
    private String rol;
    private String telefon;
    private String facultate;

    public UserDetails(String email, String rol, String telefon, String facultate, String idUser) {
        this.idUser = idUser;
        this.email = email;
        this.rol = rol;
        this.telefon = telefon;
        this.facultate = facultate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getFacultate() {
        return facultate;
    }

    public void setFacultate(String facultate) {
        this.facultate = facultate;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }
}
