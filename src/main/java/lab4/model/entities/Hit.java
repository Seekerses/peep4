package lab4.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "HIT")
public class Hit {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private double xCoordinate;
    private double yCoordinate;
    private double rValue;
    private boolean hitResult;
    @ManyToOne(optional = false)
    @JoinColumn(name = "USER_ID")
    private User user;

    public Hit(double xCoordinate, double yCoordinate, double rValue, boolean hitResult) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.rValue = rValue;
        this.hitResult = hitResult;
    }

    public Hit() {
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @JsonIgnore
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(double xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public double getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(double yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public double getrValue() {
        return rValue;
    }

    public void setrValue(double rValue) {
        this.rValue = rValue;
    }

    public boolean isHitResult() {
        return hitResult;
    }

    public void setHitResult(boolean hitResult) {
        this.hitResult = hitResult;
    }
}
