package edu.prahlad.casestudy.knowlad.controller;

import edu.prahlad.casestudy.knowlad.core.ModuleService;
import edu.prahlad.casestudy.knowlad.entity.maintenance.Modules;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://192.168.1.1:4200", "http://localhost:4200"})
@RestController
@RequestMapping("modules")
public class ModulesController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("getModulesList")
    public List<Modules>  getModulesList() throws CaseStudyException {
        return this.moduleService.getModulesList();
    }

}
