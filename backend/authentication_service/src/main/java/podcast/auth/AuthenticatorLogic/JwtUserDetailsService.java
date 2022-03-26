package podcast.auth.AuthenticatorLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import podcast.auth.AuthenticatorLogic.User.UserDao;
import podcast.auth.AuthenticatorLogic.User.DAOUser;
import podcast.auth.AuthenticatorLogic.User.User;
import podcast.auth.AuthenticatorLogic.User.UserDTO;

import java.util.ArrayList;


@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        DAOUser user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(user.getIdUser(), user.getRol(), user.getUsername(), user.getPassword(), true, new ArrayList<>());
    }

    public DAOUser save(UserDTO user) {
        DAOUser newUser = new DAOUser();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setRol(user.getRol());
        return userDao.save(newUser);
    }
}