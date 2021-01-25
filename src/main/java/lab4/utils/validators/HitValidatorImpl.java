package lab4.utils.validators;

import lab4.exceptions.InvalidParameterValue;
import org.springframework.stereotype.Component;

@Component
public class HitValidatorImpl implements HitValidator {

    @Override
    public void validate(Double x, Double y, Double r) throws InvalidParameterValue {
        checkX(x);
        checkY(y);
        check(r);
    }

    private void check(Double r) throws InvalidParameterValue {

        if (r == null) throw new InvalidParameterValue();
        if (r < -3D || r >3D) throw new InvalidParameterValue();
    }

    private void checkY(Double y) throws InvalidParameterValue {

        if (y == null) throw new InvalidParameterValue();
        if (y < -3D || y >3D) throw new InvalidParameterValue();
    }

    private void checkX(Double x) throws InvalidParameterValue {

        if (x == null) throw new InvalidParameterValue();
        if (x < -3D || x > 3D) throw new InvalidParameterValue();
    }


}
