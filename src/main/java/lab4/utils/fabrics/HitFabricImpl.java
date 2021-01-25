package lab4.utils.fabrics;

import lab4.exceptions.InvalidParameterValue;
import lab4.model.entities.Hit;
import lab4.utils.checkers.HitChecker;
import lab4.utils.validators.HitValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HitFabricImpl implements HitFabric {

    @Autowired
    HitChecker checker;
    @Autowired
    HitValidator validator;


    @Override
    public Hit createHit(double x, double y, double r) throws InvalidParameterValue {

        validator.validate(x,y,r);
        boolean isInArea = checker.checkHit(x,y,r);

        return new Hit(x,y,r,isInArea);
    }
}
