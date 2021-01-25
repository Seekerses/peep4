package lab4.controllers;

import lab4.model.DTO.UserDTO;
import lab4.model.entities.User;
import lab4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO){
        if (userService.saveUser(new User(userDTO.getUsername(), userDTO.getPassword())))
        return new ResponseEntity<String>( HttpStatus.OK);
        else
            return new ResponseEntity<String>("bad, cowboy", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> checkUser(){
        if (userService.getIdByUsername(SecurityContextHolder.getContext().getAuthentication().getName()) == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else return new ResponseEntity<>(HttpStatus.OK);
    }
}
