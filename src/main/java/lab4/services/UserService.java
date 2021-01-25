package lab4.services;

import lab4.model.entities.Role;
import lab4.model.entities.User;
import lab4.model.repositories.RoleCrudRepository;
import lab4.model.repositories.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserCrudRepository userCrudRepository;
    @Autowired
    RoleCrudRepository roleCrudRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userCrudRepository.findByUsername(username);

        if (user == null) {
            System.out.print("NO");
            throw new UsernameNotFoundException("User not found");
        }
        System.out.print("YES");
        return user;
    }

    public User findUserById(Long userId) {
        Optional<User> userFromDb = userCrudRepository.findById(userId);
        return userFromDb.orElse(new User());
    }

    public List<User> allUsers() {
        return (List<User>) userCrudRepository.findAll();
    }

    public boolean saveUser(User user) {
        User userFromDB = userCrudRepository.findByUsername(user.getUsername());

        if (userFromDB != null) {
            return false;
        }

        user.setRoles(Collections.singleton(new Role(1L, "ROLE_USER")));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userCrudRepository.save(user);
        return true;
    }

    public boolean deleteUser(Long userId) {
        if (userCrudRepository.findById(userId).isPresent()) {
            userCrudRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public Long getIdByUsername(String username){
        User user = userCrudRepository.findByUsername(username);
        if (user == null)
            return null;
        else
            return userCrudRepository.findByUsername(username).getId();
    }
}
