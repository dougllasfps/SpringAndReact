package org.dougllas.springboot.controller;

import org.dougllas.springboot.model.Pessoa;
import org.dougllas.springboot.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/pessoas")
public class PessoaController {

    @Autowired
    private PessoaRepository repository;

    @ResponseBody
    @RequestMapping("/")
    public ResponseEntity<List<Pessoa>> all(){
        Pessoa pessoa = new Pessoa();
        pessoa.setCpf("03124062310");
        pessoa.setNome("Dougllas");
        pessoa.setNascimento(LocalDate.of(1988,6,8));
        repository.save(pessoa);
        return new ResponseEntity<List<Pessoa>>(repository.findAll(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping("/nome/{nome}")
    public ResponseEntity<List<Pessoa>> byNome(@PathVariable("nome") String nome){
        return new ResponseEntity<List<Pessoa>>(repository.findByNome(nome), HttpStatus.OK);
    }
}