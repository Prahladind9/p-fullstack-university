package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepo extends JpaRepository<Users, Long> {

    Users findByUserName(String username);
    Users findByEmail(String email);
    List<Users> findAll();
}
