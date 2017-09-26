package org.dougllas.springboot.controller;

import org.dougllas.springboot.model.Pessoa;
import org.dougllas.springboot.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/pessoas")
public class PessoaController {

    @Autowired
    private PessoaRepository repository;

    @ResponseBody
    @RequestMapping("/")
    public ResponseEntity<List<Pessoa>> all(){
        return new ResponseEntity<List<Pessoa>>(repository.findAll(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping("/nome/{nome}")
    public ResponseEntity<List<Pessoa>> byNome(@PathVariable("nome") String nome){
        return new ResponseEntity<List<Pessoa>>(repository.findByNome(nome), HttpStatus.OK);
    }

    @RequestMapping(value = "/pessoa",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity save(@RequestBody(required = true) @Valid Pessoa pessoa, BindingResult validationResult){
        if(validationResult.hasErrors()){
            return new ResponseEntity<List>(validationResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        repository.save(pessoa);
        return new ResponseEntity<Pessoa>(pessoa, HttpStatus.CREATED);
    }
}