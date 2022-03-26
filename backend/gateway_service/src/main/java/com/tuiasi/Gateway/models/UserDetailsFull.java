package com.tuiasi.Gateway.models;

public class UserDetailsFull {
    int idUser;
    String telefon;
    String facultate;
    String email;
    String rol;

    @Override
    public String toString() {
        return "UserDetailsFull{" +
                "idUser=" + idUser +
                ", telefon='" + telefon + '\'' +
                ", facultate='" + facultate + '\'' +
                ", email='" + email + '\'' +
                ", rol='" + rol + '\'' +
                '}';
    }

    public UserDetailsFull(int idUser, String telefon, String facultate, String email, String rol) {
        this.idUser = idUser;
        this.telefon = telefon;
        this.facultate = facultate;
        this.email = email;
        this.rol = rol;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
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
}
