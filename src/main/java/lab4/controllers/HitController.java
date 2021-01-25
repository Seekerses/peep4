package lab4.controllers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lab4.exceptions.InvalidParameterValue;
import lab4.model.DTO.HitDTO;
import lab4.model.entities.Hit;
import lab4.services.HitService;
import lab4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/hit")
public class HitController {

    @Autowired
    HitService hitService;

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> handleHit(@RequestBody HitDTO hitDTO){

        try {
            hitService.createHit(hitDTO);
        } catch (Exception e) {
            ResponseEntity.badRequest();
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Hit>> getHit(){
        Long id = userService.getIdByUsername
                (SecurityContextHolder.getContext().getAuthentication().getName());
        List<Hit> list = hitService.getHitsByUserId(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteHits(){
        Long id = userService.getIdByUsername
                (SecurityContextHolder.getContext().getAuthentication().getName());
        if (hitService.clear(id) > 0){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else return new ResponseEntity<>("nice hit, beebop",HttpStatus.BAD_REQUEST);
    }
}
