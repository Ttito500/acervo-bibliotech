package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.response.AlunoLeiturasDTO;

import com.bibliotech.bibliotech.dtos.response.LivrosMaisLidosDTO;
import com.bibliotech.bibliotech.dtos.response.RelatorioAcervoDTO;
import com.bibliotech.bibliotech.dtos.response.TurmaLeiturasDTO;
import com.bibliotech.bibliotech.models.FrequenciaAlunos;
import com.bibliotech.bibliotech.models.Ocorrencia;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;

import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class PdfExportService {

    public byte[] exportFrequenciaAlunosToPdf(List<FrequenciaAlunos> frequenciaAlunosList) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        addHeader(document, writer);

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        //fonte em negrito para o título, tamanho 18
        Font fontBold18 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

        PdfPCell cell = new PdfPCell(new Phrase("Frequência de Alunos", fontBold18));
        cell.setColspan(3);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(8.0f);
        table.addCell(cell);

        //fonte em negrito para os headers da tabela, tamanho 12
        Font FontBold12 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        table.addCell(new Phrase("Aluno", FontBold12));
        table.addCell(new Phrase("Atividade", FontBold12));
        table.addCell(new Phrase("Data", FontBold12));

        for (FrequenciaAlunos frequenciaAlunos : frequenciaAlunosList) {
            table.addCell(frequenciaAlunos.getAluno().getNome());

            // Replace underscores with spaces in the atividade field
            String atividade = frequenciaAlunos.getAtividade().replace("_", " ");
            table.addCell(atividade);

            table.addCell(frequenciaAlunos.getData().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }

        document.add(table);
        document.close();

        return out.toByteArray();
    }

    public byte[] exportOcorrenciasToPdf(List<Ocorrencia> ocorrenciasList) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        addHeader(document, writer);

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);
        table.setWidths(new float[]{2, 2, 5});

        //fonte em negrito para o título, tamanho 18
        Font fontBold18 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

        PdfPCell cell = new PdfPCell(new Phrase("Ocorrências", fontBold18));
        cell.setColspan(3);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(8.0f);
        table.addCell(cell);

        //fonte em negrito para os headers da tabela, tamanho 12
        Font FontBold12 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        table.addCell(new Phrase("Aluno", FontBold12));
        table.addCell(new Phrase("Registrada por", FontBold12));
        table.addCell(new Phrase("Detalhes", FontBold12));

        for (Ocorrencia ocorrencia : ocorrenciasList) {
            table.addCell(ocorrencia.getAluno().getNome());
            table.addCell(ocorrencia.getRegistradaPor().getNome());
            table.addCell(ocorrencia.getDetalhes());
        }

        document.add(table);
        document.close();

        return out.toByteArray();
    }

    public byte[] exportTurmasMaisLeitoras(List<TurmaLeiturasDTO> turmasMaisLeitoras) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        addHeader(document, writer);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        //fonte em negrito para o título, tamanho 18
        Font fontBold18 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

        PdfPCell cell = new PdfPCell(new Phrase("Turmas Leitoras", fontBold18));
        cell.setColspan(5);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(8.0f);
        table.addCell(cell);

        //fonte em negrito para os headers da tabela, tamanho 12
        Font FontBold12 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        table.addCell(new Phrase("Turma", FontBold12));
        table.addCell(new Phrase("Leituras da Turma", FontBold12));
        table.addCell(new Phrase("Aluno Destaque", FontBold12));
        table.addCell(new Phrase("Leituras do Aluno", FontBold12));

        for (TurmaLeiturasDTO turmaLeiturasDTO : turmasMaisLeitoras) {
            table.addCell(turmaLeiturasDTO.getSerie() + " " + turmaLeiturasDTO.getTurma());
            table.addCell(turmaLeiturasDTO.getQuantidadeLeiturasTurma().toString());
            table.addCell(turmaLeiturasDTO.getNomeAluno());
            table.addCell(turmaLeiturasDTO.getQuantidadeLeiturasAluno().toString());
        }

        document.add(table);
        document.close();

        return out.toByteArray();
    }

    public byte[] exportAlunosMaisLeitores(List<AlunoLeiturasDTO> alunos) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter writer = PdfWriter.getInstance(document, out);
            document.open();

            addHeader(document, writer);

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);
            table.setWidths(new float[]{2, 1, 1});

            //fonte em negrito para o título, tamanho 18
            Font fontBold18 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

            PdfPCell cell = new PdfPCell(new Phrase("Alunos Mais Leitores", fontBold18));
            cell.setColspan(3);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(8.0f);
            table.addCell(cell);

            //fonte em negrito para os headers da tabela, tamanho 12
            Font FontBold12 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

            table.addCell(new Phrase("Nome", FontBold12));
            table.addCell(new Phrase("Turma", FontBold12));
            table.addCell(new Phrase("Leituras", FontBold12));

            for (AlunoLeiturasDTO aluno : alunos) {
                table.addCell(aluno.getNome());
                table.addCell(aluno.getSerie() + " " + aluno.getTurma());
                table.addCell(aluno.getQuantidade_leituras().toString());
            }

            document.add(table);
            document.close();

        return out.toByteArray();
    }

    public byte[] exportLivrosMaisLidos(List<LivrosMaisLidosDTO> livrosMaisLidos) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        addHeader(document, writer);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        // Fonte em negrito para o título, tamanho 18
        Font fontBold18 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

        PdfPCell cell = new PdfPCell(new Phrase("Livros Mais Lidos", fontBold18));
        cell.setColspan(2);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(8.0f);
        table.addCell(cell);

        // Fonte em negrito para os headers da tabela, tamanho 12
        Font fontBold12 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        table.addCell(new Phrase("Título", fontBold12));
        table.addCell(new Phrase("Quantidade de Empréstimos", fontBold12));

        for (LivrosMaisLidosDTO livro : livrosMaisLidos) {
            table.addCell(livro.getTitulo());
            table.addCell(livro.getQuantidadeEmprestimos().toString());
        }

        document.add(table);
        document.close();

        return out.toByteArray();
    }

    public byte[] exportRelatorioAcervo(List<RelatorioAcervoDTO> relatorioAcervo) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        addHeader(document, writer);

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);
        table.setWidths(new float[]{5, 3, 2});

        Font fontBold18 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        PdfPCell cell = new PdfPCell(new Phrase("Relatório Completo do Acervo", fontBold18));
        cell.setColspan(3); // Span across all 3 columns
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(8.0f);
        table.addCell(cell);

        Font fontBold12 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        table.addCell(new Phrase("Título", fontBold12));
        table.addCell(new Phrase("Autor", fontBold12));
        table.addCell(new Phrase("Quantidade", fontBold12));


        for (RelatorioAcervoDTO livro : relatorioAcervo) {
            table.addCell(livro.getTitulo());
            table.addCell(livro.getAutor());
            table.addCell(livro.getQtdExemplares().toString());
        }

        document.add(table);
        document.close();

        return out.toByteArray();
    }

    private void addHeader(Document document, PdfWriter writer) throws DocumentException {
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
        Font subHeaderFont = FontFactory.getFont(FontFactory.HELVETICA, 8);

        // Criar um parágrafo para o cabeçalho
        Paragraph headerContent = new Paragraph();
        headerContent.setLeading(12); // Set line spacing
        headerContent.add(new Chunk("E.E.M.T.I. ADELINO CUNHA ALCÂNTARA\n", headerFont));
        headerContent.add(new Chunk("Av. Cel. Neco Martins, 317, Centro – CEP: 62670-000 – Telefone (85)3315-7014\n", subHeaderFont));
        headerContent.add(new Chunk("Email: eemtadelinoaicantara@escola.ce.gov.br\n", subHeaderFont));
        headerContent.add(new Chunk("São Gonçalo do Amarante – Ce\n", subHeaderFont));
        headerContent.add(new Chunk("CNPJ: 079545140295-30\n", subHeaderFont));
        headerContent.add(new Chunk("NEP: 23269014\n", subHeaderFont));


        headerContent.setAlignment(Element.ALIGN_CENTER);
        document.add(headerContent);

        // Desenhar um retângulo ao redor do cabeçalho
        PdfContentByte canvas = writer.getDirectContent();
        canvas.saveState();
        canvas.setLineWidth(1f);
        canvas.setColorStroke(Color.BLACK);

        float x = document.left() - 10; // X position (left margin)
        float y = document.top() - 75; // Y position (adjusted to fit content)
        float width = document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin() + 20; // Width
        float height = 80; // Height
        float radius = 10; // Corner radius

        canvas.roundRectangle(x, y, width, height, radius);
        canvas.stroke();
        canvas.restoreState();

        // adcicionando o resto do cabeçalho entre o retangulo e o conteúdo
        Font boldSubHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8);
        Font regularSubHeaderFont = FontFactory.getFont(FontFactory.HELVETICA, 8);

        //  Cria um parágrafo para "Entidade/Escola" com rótulo em negrito
        Paragraph entity = new Paragraph();
        entity.add(new Chunk("Entidade/Escola: ", boldSubHeaderFont)); // Bold label
        entity.add(new Chunk("EEMTI ADELINO CUNHA ALCÂNTARA", regularSubHeaderFont)); // Regular text
        entity.setAlignment(Element.ALIGN_LEFT);
        document.add(entity);

        // Cria um parágrafo para "Município" com rótulo em negrito
        Paragraph municipality = new Paragraph();
        municipality.add(new Chunk("Município: ", boldSubHeaderFont)); // Bold label
        municipality.add(new Chunk("SÃO GONÇALO DO AMARANTE – CE   CREDE:02", regularSubHeaderFont)); // Regular text
        municipality.setAlignment(Element.ALIGN_LEFT);
        document.add(municipality);
    }
}
