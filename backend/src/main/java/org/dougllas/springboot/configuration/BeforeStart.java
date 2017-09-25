package org.dougllas.springboot.configuration;

import org.dougllas.springboot.model.Pessoa;
import org.dougllas.springboot.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class BeforeStart implements CommandLineRunner{

    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public void run(String... strings) throws Exception {
        Pessoa pessoa = new Pessoa();
        pessoa.setCpf("03124062310");
        pessoa.setNome("Dougllas");
        pessoa.setNascimento(LocalDate.of(1988,6,8));
        pessoaRepository.save(pessoa);
    }
}
