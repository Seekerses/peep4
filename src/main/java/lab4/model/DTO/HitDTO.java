package lab4.model.DTO;

import lombok.Data;

import java.io.Serializable;

@Data
public class HitDTO implements Serializable {

    String xCoordinate;
    String yCoordinate;
    String rValue;

    public String getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(String xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public String getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(String yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public String getrValue() {
        return rValue;
    }

    public void setrValue(String rValue) {
        this.rValue = rValue;
    }

    public HitDTO(String xCoordinate, String yCoordinate, String rValue) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.rValue = rValue;
    }
}
