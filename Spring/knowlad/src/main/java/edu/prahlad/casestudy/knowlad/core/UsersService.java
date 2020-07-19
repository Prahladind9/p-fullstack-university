package edu.prahlad.casestudy.knowlad.core;

import edu.prahlad.casestudy.knowlad.constants.ErrorCodes;
import edu.prahlad.casestudy.knowlad.entity.Users;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import edu.prahlad.casestudy.knowlad.repo.UsersRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    public Logger logger = LoggerFactory.getLogger(UsersService.class);

    @Autowired
    private UsersRepo usersRepo;
    

    
    public void save(Users users)throws CaseStudyException {
        usersRepo.save(users);
    }

    
    public Users createUser(Users users) throws CaseStudyException {
        Users localUser = usersRepo.findByUserName(users.getUserName());

        if(localUser != null){
            logger.warn("User with username {} already exists. Nothing will be done. ", users.getUserName());
            throw new CaseStudyException(ErrorCodes.E_USER_ALREADY_EXISTS, "");
        }else {
            String password = users.getPassword();
            localUser = usersRepo.save(users);
        }

        return localUser;
    }


    
    public Users findByUsername(String username) throws CaseStudyException {
        return usersRepo.findByUserName(username);
    }

    
    public Users findByEmail(String email) throws CaseStudyException {
        return usersRepo.findByEmail(email);
    }

    
    public boolean checkUserExists(String username, String email) throws CaseStudyException {
        if(checkUsernameExists(username) || checkEmailExists(email))
            return true;

        return false;
    }

    
    public boolean checkUsernameExists(String username) throws CaseStudyException {
        if(null != findByUsername(username))
            return true;

        return false;
    }

    
    public boolean checkEmailExists(String email) throws CaseStudyException {
        if(null != findByEmail(email))
            return true;

        return false;
    }


    
    public Users validateUser(Users users) throws CaseStudyException {
        Users localUser = findByUsername(users.getUserName());
        if(null == localUser)
            throw new CaseStudyException(ErrorCodes.E_NO_USER_EXISTS, "");

        return localUser;
    }

    
    public Users saveUser(Users users) throws CaseStudyException {
        return usersRepo.save(users);
    }

    
    public List<Users> getUserList() throws CaseStudyException {
        return usersRepo.findAll();
    }

    
    public void enableUser(String username) throws CaseStudyException {
        Users users = findByUsername(username);
        users.setEnabled(true);
        usersRepo.save(users);
    }

    
    public void disableUser(String username) throws CaseStudyException {
        logger.info("disableUser Call");
        Users users = findByUsername(username);
        users.setEnabled(false);
        usersRepo.save(users);
    }
}
