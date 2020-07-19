package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.entity.maintenance.Modules;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModulesRepo extends JpaRepository<Modules, Long> {
//    List<Modules> findAllByOrderbyModuleId();
}
