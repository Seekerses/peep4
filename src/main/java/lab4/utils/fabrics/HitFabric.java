package lab4.utils.fabrics;


import lab4.exceptions.InvalidParameterValue;
import lab4.model.entities.Hit;

public interface HitFabric {

    Hit createHit(double x, double y, double r) throws InvalidParameterValue;
}
