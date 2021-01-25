package lab4.model.repositories;

import lab4.model.entities.Hit;
import lab4.model.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitsCrudRepository extends CrudRepository<Hit, Long> {

    List<Hit> getHitsByUser_Id(Long id);
    Integer deleteHitsByUser_Id(Long user_id);
}
