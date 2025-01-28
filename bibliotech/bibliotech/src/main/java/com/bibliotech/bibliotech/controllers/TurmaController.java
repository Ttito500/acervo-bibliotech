package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.services.TurmasService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmasService turmasService;

    @PostMapping("")
    public ResponseEntity<Turma> criarTurma (@Valid @RequestBody Turma body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        Turma turma = turmasService.cadastrarTurma(body);
        URI location = URI.create("/turmas/" + turma.getId());
        return ResponseEntity.created(location).body(turma);
    }

    @GetMapping("")
    public ResponseEntity<List<Turma>> getTurmas(){
        List<Turma> turmas = turmasService.getTurmas();
        return ResponseEntity.ok(turmas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> getTurmaById(@PathVariable Integer id){
        return ResponseEntity.ok(turmasService.getTurmaById(id));
    }

    @GetMapping("/filtrar")
    public List<Turma> filtrarTurmas(@RequestParam(required = false) Integer serie,
                                     @RequestParam(required = false) String turma,
                                     @RequestParam(required = false) Integer anoDeEntrada,
                                     @RequestParam(required = false) Boolean ativo) {
        return turmasService.filtrarTurmas(serie, turma, anoDeEntrada, ativo);
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Turma> alterarTurma(@PathVariable Integer id, @Valid @RequestBody Turma body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        Turma turmaAtualizada = turmasService.alterarTurma(id, body);
        return ResponseEntity.ok(turmaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTurma(@PathVariable Integer id) {
        turmasService.deletarTurma(id);
        return ResponseEntity.noContent().build();
    }

    //falta testar, farei quando alves mandar o aluno atualizado, tava dando uns problema
    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Void> inativarTurma(@PathVariable Integer id) {
        turmasService.inativarTurma(id);
        return ResponseEntity.noContent().build();
    }

}
