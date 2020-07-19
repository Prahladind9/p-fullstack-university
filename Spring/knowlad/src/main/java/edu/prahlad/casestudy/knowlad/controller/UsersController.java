package edu.prahlad.casestudy.knowlad.controller;

import edu.prahlad.casestudy.knowlad.core.UsersService;
import edu.prahlad.casestudy.knowlad.entity.Users;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = {"http://192.168.1.1:4200", "http://localhost:4200", "https://379f0bb118ab.ngrok.io", "https://379f0bb118ab.ngrok.io"})
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("createUser")
    public Users createUser(@RequestBody Users users) throws CaseStudyException {
        return usersService.createUser(users);
    }

    @PostMapping("validateUser")
    public Users validateUser(@RequestBody Users users) throws CaseStudyException{
        return usersService.validateUser(users);
    }

    @PostMapping("getUser")
    public Users getUser(@RequestBody String userName) throws CaseStudyException {
        return usersService.findByUsername(userName);
    }
}
