package lab4.services;


import lab4.exceptions.InvalidParameterValue;
import lab4.model.DTO.HitDTO;
import lab4.model.entities.Hit;
import lab4.model.entities.User;
import lab4.model.repositories.HitsCrudRepository;
import lab4.model.repositories.UserCrudRepository;
import lab4.utils.fabrics.HitFabric;
import org.hibernate.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Service
public class HitService {

    @Autowired
    private UserCrudRepository userCrudRepository;

    @Autowired
    private HitsCrudRepository hitsCrudRepository;

    @Autowired
    private HitFabric hitFabric;

    @Transactional
    public Hit createHit(HitDTO hitDTO) throws InvalidParameterValue {

        double x;
        double y;
        double r;

        try{
            x = Double.parseDouble(hitDTO.getxCoordinate());
        }
        catch (NumberFormatException e){
            throw new NumberFormatException("Invalid x string");
        }
        try{
            y = Double.parseDouble(hitDTO.getyCoordinate());
        }
        catch (NumberFormatException e){
            throw new NumberFormatException("Invalid y string");
        }
        try{
            r = Double.parseDouble(hitDTO.getrValue());
        }
        catch (NumberFormatException e){
            throw new NumberFormatException("Invalid r string");
        }

        Hit hit = hitFabric.createHit(x,y,r);
        hit.setUser(userCrudRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));


        hitsCrudRepository.save(hit);

        return hit;
    }

    @Transactional
    public List<Hit> getHitsByUserId(Long id){
        return hitsCrudRepository.getHitsByUser_Id(id);
    }

    @Transactional
    public Integer clear(Long id){
        return hitsCrudRepository.deleteHitsByUser_Id(id);
    }
}
