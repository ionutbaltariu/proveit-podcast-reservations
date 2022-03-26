package com.tuiasi.Gateway.models;

import java.time.LocalDateTime;

public class Notificare {
    String emailSursa;
    String emailDestinatie;
    int idUserSursa;
    int idUserDestinatie;
    LocalDateTime timestamp;

    @Override
    public String toString() {
        return "Notificare{" +
                "emailSursa='" + emailSursa + '\'' +
                ", emailDestinatie='" + emailDestinatie + '\'' +
                ", idUserSursa=" + idUserSursa +
                ", idUserDestinatie=" + idUserDestinatie +
                ", timestamp=" + timestamp +
                '}';
    }

    public Notificare(String emailSursa, String emailDestinatie, int idUserSursa, int idUserDestinatie, LocalDateTime timestamp) {
        this.emailSursa = emailSursa;
        this.emailDestinatie = emailDestinatie;
        this.idUserSursa = idUserSursa;
        this.idUserDestinatie = idUserDestinatie;
        this.timestamp = timestamp;
    }

    public String getEmailSursa() {
        return emailSursa;
    }

    public void setEmailSursa(String emailSursa) {
        this.emailSursa = emailSursa;
    }

    public String getEmailDestinatie() {
        return emailDestinatie;
    }

    public void setEmailDestinatie(String emailDestinatie) {
        this.emailDestinatie = emailDestinatie;
    }

    public int getIdUserSursa() {
        return idUserSursa;
    }

    public void setIdUserSursa(int idUserSursa) {
        this.idUserSursa = idUserSursa;
    }

    public int getIdUserDestinatie() {
        return idUserDestinatie;
    }

    public void setIdUserDestinatie(int idUserDestinatie) {
        this.idUserDestinatie = idUserDestinatie;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
