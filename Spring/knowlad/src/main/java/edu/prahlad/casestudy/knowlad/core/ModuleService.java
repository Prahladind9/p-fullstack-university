package edu.prahlad.casestudy.knowlad.core;

import edu.prahlad.casestudy.knowlad.entity.maintenance.Modules;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import edu.prahlad.casestudy.knowlad.repo.ModulesRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleService {

    public Logger logger = LoggerFactory.getLogger(ModuleService.class);
    @Autowired
    private ModulesRepo modulesRepo;

    public List<Modules> getModulesList() throws CaseStudyException {
        return modulesRepo.findAll();
    }
}
