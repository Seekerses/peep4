package lab4.utils.validators;

import lab4.exceptions.InvalidParameterValue;

public interface HitValidator {

    void validate(Double x, Double y, Double r) throws InvalidParameterValue;
}
