package com.bibliotech.bibliotech.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.bibliotech.bibliotech.exception.TokenExeption;
import com.bibliotech.bibliotech.models.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario){
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("bibliotech")
                    .withSubject(usuario.getEmail())
                    .withClaim("nome", usuario.getNome())
                    .withClaim("id", usuario.getId())
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algoritimo);
            return token;
        } catch (JWTCreationException exception){
            throw new TokenExeption("Erro ao criar token de autenticação");
        }
    }

    public String validarToken(String token){
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            return JWT.require(algoritimo)
                    .withIssuer("bibliotech")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            throw new TokenExeption(exception.getMessage());
        }
    }

    private Instant gerarDataExpiracao(){
        return LocalDateTime.now().plusHours(4).toInstant(ZoneOffset.of("-03:00")); //horario de brasilia
    }

    public Integer getUsuarioId() {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                throw new TokenExeption("Usuário não autenticado");
            }

            String token = authentication.getCredentials().toString();
            return JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer("bibliotech")
                    .build()
                    .verify(token)
                    .getClaim("id")
                    .asInt();
        } catch (Exception exception) {
            throw new TokenExeption("Erro ao obter ID do usuário do token");
        }
    }

    public String getUsuarioNome() {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                throw new TokenExeption("Usuário não autenticado");
            }

            String token = authentication.getCredentials().toString();
            return JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer("bibliotech")
                    .build()
                    .verify(token)
                    .getClaim("nome")
                    .asString();
        } catch (Exception exception) {
            throw new TokenExeption("Erro ao obter nome do usuário do token");
        }
    }
}