package lab4.model.repositories;

import lab4.model.entities.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleCrudRepository extends CrudRepository<Role, Long> {
}
