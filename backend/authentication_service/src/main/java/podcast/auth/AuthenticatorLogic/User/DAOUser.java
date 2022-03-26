package podcast.auth.AuthenticatorLogic.User;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class DAOUser {

    @SuppressWarnings("unused")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;
    @Column
    private String username;
    @Column
    @JsonIgnore
    private String password;
    @Column
    private String rol;
    @Column
    private String telefon;
    @Column
    private String facultate;

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long id) {
        this.idUser = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String role) {
        this.rol = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}
