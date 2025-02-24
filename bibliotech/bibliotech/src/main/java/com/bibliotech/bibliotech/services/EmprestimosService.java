package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTO;
import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTOConcluir;
import com.bibliotech.bibliotech.dtos.request.mappers.EmprestimoRequestMapper;
import com.bibliotech.bibliotech.dtos.response.EmprestimoNotificacaoDTO;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTO;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTOAluno;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTOLivro;
import com.bibliotech.bibliotech.dtos.response.mappers.EmprestimoResponseMapper;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Emprestimo;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.repositories.*;
import com.bibliotech.bibliotech.specifications.EmprestimoSpecification;
import com.bibliotech.bibliotech.utils.EmailSend;
import com.bibliotech.bibliotech.utils.FormatarData;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmprestimosService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private EmprestimoRequestMapper emprestimoRequestMapper;

    @Autowired
    private EmprestimoResponseMapper emprestimoResponseMapper;

    @Autowired
    private EmprestimoSpecification emprestimoSpecification;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailSend emailSend;

    public EmprestimoResponseDTO realizarEmprestimo(EmprestimoRequestDTO requestDTO) {
        if (requestDTO.getIdAluno() == null) {
            throw new ValidationException("O ID do aluno não pode ser nulo.");
        }
        if (requestDTO.getIdExemplar() == null) {
            throw new ValidationException("O ID do exemplar não pode ser nulo.");
        }
        if (requestDTO.getIdUsuario() == null) {
            throw new ValidationException("O ID do usuário não pode ser nulo.");
        }

        Aluno aluno = alunoRepository.findById(requestDTO.getIdAluno())
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado"));

        if (!"regular".equalsIgnoreCase(aluno.getSituacao())) {
            throw new ValidationException("O aluno não está com a situação regular");
        }

        Exemplar exemplar = exemplarRepository.findById(requestDTO.getIdExemplar())
                .orElseThrow(() -> new NotFoundException("Exemplar não encontrado"));

        if (!"disponivel".equalsIgnoreCase(exemplar.getSituacao())) {
            throw new ValidationException("O exemplar não está disponível");
        }

        //tambem existe um getNomeUsuario no tokenService
        //System.out.println(requestDTO.getIdUsuario() + " ////////////////////////"); so para exemplificar como pegar id

        Usuario usuario = usuarioRepository.findById(requestDTO.getIdUsuario())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        Emprestimo emprestimo = emprestimoRequestMapper.toEntity(requestDTO);

        emprestimo.setAluno(aluno);
        emprestimo.setExemplar(exemplar);
        emprestimo.setRealizadoPor(usuario);
        emprestimo.setSituacao("pendente");

        aluno.setSituacao("debito");
        exemplar.setSituacao("emprestado");

        Emprestimo emprestimoSalvo = emprestimoRepository.save(emprestimo);

        return emprestimoResponseMapper.toDto(emprestimoSalvo);
    }

    //CONSERTAR USUARIO DEPOIS
    public String cancelarEmprestimo(Integer id){
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Emprestimo com o ID " + id + " não encontrado."));

        if (emprestimo.getSituacao().equals("cancelado")){
            throw new ValidationException("Emprestimo ja cancelado.");
        }

        emprestimo.setSituacao("cancelado");
        emprestimo.getAluno().setSituacao("regular");
        emprestimo.getExemplar().setSituacao("disponivel");

        emprestimo.setConcluidoPor(emprestimo.getRealizadoPor()); //TEMPORARIO

        emprestimo.setDataConclusao(LocalDate.now());

        emprestimoRepository.save(emprestimo);

        return "Emprestimo cancelado com sucesso.";
    }

    //CONSERTAR USUARIO DEPOIS
    public String concluirEmprestimo(Integer id, EmprestimoRequestDTOConcluir DTOConcluir){
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Emprestimo com o ID " + id + " não encontrado."));

        if (emprestimo.getSituacao().equals("cancelado") || emprestimo.getSituacao().equals("entregue") || emprestimo.getSituacao().equals("extraviado")){
            throw new ValidationException("Emprestimo ja concluido.");
        }

        emprestimo.setObservacao(DTOConcluir.getObservacao());
        emprestimo.setDataConclusao(LocalDate.now());

        emprestimo.setConcluidoPor(emprestimo.getRealizadoPor()); //TEMPORARIO

        if (!DTOConcluir.isExtraviado()){
            emprestimo.setSituacao("entregue");
            emprestimo.getAluno().setSituacao("regular");
            emprestimo.getExemplar().setSituacao("disponivel");
        }else {
            emprestimo.setSituacao("extraviado");
            emprestimo.getAluno().setSituacao("irregular");
            emprestimo.getExemplar().setSituacao("extraviado");
        }

        emprestimoRepository.save(emprestimo);

        return DTOConcluir.isExtraviado() ? "Emprestimo extraviado com sucesso." : "Emprestimo concluido com sucesso.";
    }

    @Transactional
    public String renovarPrazo(Integer id){
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Emprestimo com o ID " + id + " não encontrado."));

        if (emprestimo.getSituacao().equals("cancelado") || emprestimo.getSituacao().equals("entregue") || emprestimo.getSituacao().equals("extraviado")){
            throw new ValidationException("Emprestimo ja concluido.");
        }

        if (ChronoUnit.DAYS.between(emprestimo.getDataEmprestimo(), LocalDate.now()) > 30) {
            throw new ValidationException("Renovação não permitida. O prazo máximo para renovação foi excedido.");
        }


        if (emprestimo.getQtdRenovacao() >= 3){
            throw new ValidationException("Renovação não permitida. O número máximo de renovações foi atingido.");
        }

        if (emprestimo.getSituacao().equals("atrasado")){
            emprestimo.setDataPrazo(LocalDate.now().plusDays(7));
            emprestimo.setSituacao("pendente");
        }
        else {
            emprestimo.setDataPrazo(emprestimo.getDataPrazo().plusDays(7));
        }

        emprestimo.setQtdRenovacao(emprestimo.getQtdRenovacao() + 1);

        emprestimoRepository.save(emprestimo);

        return "Prazo renovado com sucesso.";
    }

    public Page<EmprestimoResponseDTO> consultarEmprestimos(
            String nomeAluno, String tituloLivro, String isbn, String situacao,
            String nomeRealizadoPor, LocalDate dataEmprestimo, String nomeConcluidoPor,
            LocalDate dataPrazo, LocalDate dataConclusao, Pageable pageable) {

        Specification<Emprestimo> spec = emprestimoSpecification.buildSpecification(
                nomeAluno, tituloLivro, isbn, situacao, nomeRealizadoPor,
                dataEmprestimo, nomeConcluidoPor, dataPrazo, dataConclusao);

        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "dataEmprestimo")
        );

        Page<Emprestimo> emprestimos = emprestimoRepository.findAll(spec, sortedPageable);

        return emprestimos.map(emprestimoResponseMapper::toDto);
    }

    public Page<EmprestimoResponseDTOAluno> consultarEmprestimosPorAlunoEPeriodo(
            Integer idAluno, LocalDate dataEmprestimoInicio, LocalDate dataEmprestimoFim, Pageable pageable) {

        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "dataEmprestimo")
        );

        Page<Emprestimo> emprestimos;

        if (dataEmprestimoInicio != null && dataEmprestimoFim != null) {
            emprestimos = emprestimoRepository.findByAlunoIdAndDataEmprestimoBetween(
                    idAluno, dataEmprestimoInicio, dataEmprestimoFim, sortedPageable);
        } else {
            emprestimos = emprestimoRepository.findByAlunoId(idAluno, sortedPageable);
        }

        return emprestimos.map(emprestimoResponseMapper::toDTOAluno);
    }

    public Page<EmprestimoResponseDTOLivro> consultarEmprestimosPorLivroEPeriodo(
            Integer idLivro, LocalDate dataEmprestimoInicio, LocalDate dataEmprestimoFim, Pageable pageable) {

        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "dataEmprestimo")
        );

        Page<Emprestimo> emprestimos;

        if (dataEmprestimoInicio != null && dataEmprestimoFim != null) {
            emprestimos = emprestimoRepository.findByExemplar_LivroIdAndDataEmprestimoBetween(
                    idLivro, dataEmprestimoInicio, dataEmprestimoFim, sortedPageable);
        } else {
            emprestimos = emprestimoRepository.findByExemplar_LivroId(idLivro, sortedPageable);
        }

        return emprestimos.map(emprestimoResponseMapper::toDTOLivro);
    }

    public List<EmprestimoNotificacaoDTO> enviarEmailAtrasadosEPresteAAtrasar() {
        LocalDate hoje = LocalDate.now();
        List<EmprestimoNotificacaoDTO> emprestimosNotificados = new ArrayList<>();

        verificarAtrasados();

        List<Emprestimo> emprestimosAtrasados = emprestimoRepository.findBySituacao("atrasado");
        for (Emprestimo emprestimo : emprestimosAtrasados) {
            if (enviarNotificacaoAtraso(emprestimo)) {
                emprestimosNotificados.add(emprestimoResponseMapper.toDTONotificacao(emprestimo));
            }
        }

        LocalDate amanha = hoje.plusDays(1);
        List<Emprestimo> emprestimosPrestesAAtasar = emprestimoRepository.findBySituacaoAndDataPrazo("pendente", amanha);
        for (Emprestimo emprestimo : emprestimosPrestesAAtasar) {
            if (enviarNotificacaoPreAtraso(emprestimo)) {
                emprestimosNotificados.add(emprestimoResponseMapper.toDTONotificacao(emprestimo));
            }
        }

        return emprestimosNotificados;
    }

    private boolean enviarNotificacaoAtraso(Emprestimo emprestimo) {
        LocalDate hoje = LocalDate.now();

        if (emprestimo.getDataUltimaNotificacao() != null && emprestimo.getDataUltimaNotificacao().isEqual(hoje)) {
            return false;
        }

        try {
            String assunto = "Empréstimo atrasado - Biblioteca";

            String dataPrazoFormatada = FormatarData.formatarData(emprestimo.getDataPrazo());
            String dataEmprestimoFormatada = FormatarData.formatarData(emprestimo.getDataEmprestimo());

            String mensagem = String.format(
                    "Olá %s,\n\n" +
                            "Identificamos que o empréstimo do livro \"%s\" está atrasado.\n" +
                            "A data de devolução era %s, e até o momento não registramos a devolução.\n\n" +
                            "Por favor, entregue o livro o mais breve possível ou renove o empréstimo para regularizar a situação.\n\n" +
                            "Detalhes do empréstimo:\n" +
                            "- Livro: %s\n" +
                            "- Data do empréstimo: %s\n" +
                            "- Data para devolução: %s\n" +
                            "- Situação atual: Atrasado\n\n" +
                            "Caso você já tenha devolvido o livro, por favor, entre em contato conosco para atualizarmos nossos registros.\n\n" +
                            "Atenciosamente, \n" +
                            "Biblioteca Adelino Cunha.",
                    emprestimo.getAluno().getNome(),
                    emprestimo.getExemplar().getLivro().getTitulo(),
                    dataPrazoFormatada,
                    emprestimo.getExemplar().getLivro().getTitulo(),
                    dataEmprestimoFormatada,
                    dataPrazoFormatada
            );

            emailSend.sendEmail(emprestimo.getAluno().getEmail(), assunto, mensagem);

            emprestimo.setDataUltimaNotificacao(hoje);
            emprestimoRepository.save(emprestimo);

            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar e-mail para: " + emprestimo.getAluno().getEmail(), e);
        }
    }

    private boolean enviarNotificacaoPreAtraso(Emprestimo emprestimo) {
        LocalDate hoje = LocalDate.now();

        if (emprestimo.getDataUltimaNotificacao() != null && emprestimo.getDataUltimaNotificacao().isEqual(hoje)) {
            return false;
        }

        try {
            String assunto = "Lembrete: Empréstimo prestes a atrasar - Biblioteca";

            String dataPrazoFormatada = FormatarData.formatarData(emprestimo.getDataPrazo());
            String dataEmprestimoFormatada = FormatarData.formatarData(emprestimo.getDataEmprestimo());

            String mensagem = String.format(
                    "Olá %s,\n\n" +
                            "Este é apenas um lembrete de que o prazo de devolução do livro \"%s\" está se aproximando.\n" +
                            "A data de devolução é amanhã, %s.\n\n" +
                            "Por favor, entregue o livro até essa data ou renove o empréstimo para evitar atrasos.\n\n" +
                            "Detalhes do empréstimo:\n" +
                            "- Livro: %s\n" +
                            "- Data do empréstimo: %s\n" +
                            "- Data para devolução: %s\n" +
                            "- Situação atual: Pendente\n\n" +
                            "Caso você já tenha devolvido o livro, por favor, entre em contato conosco para atualizarmos nossos registros.\n\n" +
                            "Atenciosamente, \n" +
                            "Biblioteca Adelino Cunha.",
                    emprestimo.getAluno().getNome(),
                    emprestimo.getExemplar().getLivro().getTitulo(),
                    dataPrazoFormatada,
                    emprestimo.getExemplar().getLivro().getTitulo(),
                    dataEmprestimoFormatada,
                    dataPrazoFormatada
            );

            emailSend.sendEmail(emprestimo.getAluno().getEmail(), assunto, mensagem);

            emprestimo.setDataUltimaNotificacao(hoje);
            emprestimoRepository.save(emprestimo);

            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar e-mail para: " + emprestimo.getAluno().getEmail(), e);
        }
    }

    private void verificarAtrasados(){
        LocalDate hoje = LocalDate.now();
        List<Emprestimo> emprestimosPendentes = emprestimoRepository.findBySituacao("pendente");

        for (Emprestimo emprestimo : emprestimosPendentes) {
            if (!emprestimo.getDataPrazo().isAfter(hoje)) { // Se a data prazo já passou ou é hoje
                emprestimo.setSituacao("atrasado");
            }
        }

        emprestimoRepository.saveAll(emprestimosPendentes);
    }
}
