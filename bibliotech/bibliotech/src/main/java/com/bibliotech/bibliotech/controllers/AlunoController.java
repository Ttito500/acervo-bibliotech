package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.services.AlunosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunosService alunosService;

    @Autowired
    public AlunoController(AlunosService alunosService) {
        this.alunosService = alunosService;
    }

    @GetMapping("/filtrar")
    public List<Aluno> filtrarAlunos(@RequestParam(required = false) Integer serie,
                                     @RequestParam(required = false) String turma,
                                     @RequestParam(required = false) String nome,
                                     @RequestParam(required = false) String situacao) {
        return alunosService.filtrarAlunos(serie, turma, nome, situacao);
    }


    @PostMapping("")
    public ResponseEntity<Aluno> criarAluno (@RequestBody Aluno body){
        Aluno aluno = alunosService.cadastrarAluno(body);
        URI location = URI.create("/alunos/" + aluno.getId());
        return ResponseEntity.created(location).body(aluno);
    }

    @GetMapping("")
    public ResponseEntity<List<Aluno>> getAlunos(){
        List<Aluno> alunos = alunosService.getAlunos();
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Aluno>> getAlunoById(@PathVariable Integer id){
        return ResponseEntity.ok(alunosService.getAlunoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> alterarAluno(@PathVariable Integer id, @RequestBody Aluno body) {
        Aluno alunoAtualizado = alunosService.alterarAluno(id, body);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAluno(@PathVariable Integer id) {
        alunosService.deletarAluno(id);
        return ResponseEntity.noContent().build();
    }
}
