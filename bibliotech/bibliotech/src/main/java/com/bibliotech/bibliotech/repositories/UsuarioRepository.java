package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u " +
            "WHERE (:nome IS NULL OR u.nome = :nome) " +
            "AND (:cargo IS NULL OR u.cargo = :cargo) " +
            "AND (:ativo IS NULL OR u.ativo = :ativo)")
    List<Usuario> filtrarUsuarios(@Param("nome") String nome,
                              @Param("cargo") String cargo,
                              @Param("ativo") Boolean ativo);

    boolean existsByEmail(String email);

    Optional<Usuario> findById(Integer id);

    Optional<Usuario> findByIdAndCargo(Integer id, String alunoMonitor);

    UserDetails findByEmail(String email);
}
