import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obterModeloPorTipo } from "../modelos/GerenciadorModelos.js";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFFile from "../components/PDFFile.jsx";
import styles from "../components/Biblioteca.module.css";

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("A carregar...");
  const [logoUsuario, setLogoUsuario] = useState(null);

  const [tipoDocAtual, setTipoDocAtual] = useState("");

  const [respostas, setRespostas] = useState({
    comarca: "Lisboa",
    prestador: "",
    cliente: "",
    descricaoServico: "",
    valor: "",
    prazo: "",
    senhorio: "",
    inquilino: "",
    moradaImovel: "",
    valorRenda: "",
    dataInicio: "",
    prazoMeses: "12",
    temFiador: false,
    nomeFiador: "",
    parteReveladora: "",
    parteReceptora: "",
    objetivo: "",
    multa: "10.000",
    temConfidencialidade: false,
    temExclusividade: false,
    // Novos campos
    empregador: "",
    trabalhador: "",
    funcao: "",
    salario: "",
    dataFim: "",
    motivoTermo: "",
    empresa: "",
    site: "",
    emailDPO: "",
    validadeProposta: "",
    condicoesPagamento: "",
    materiais: "",
  });

  const planoDoUsuario = "pro";

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = localStorage.getItem("token");
        const resposta = await fetch(`http://localhost:3000/documento/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resposta.ok) {
          const doc = await resposta.json();
          setTipoDocAtual(doc.tipo_documento);

          if (doc.conteudo_json && doc.conteudo_json !== "{}") {
            const dadosSalvos = JSON.parse(doc.conteudo_json);
            const respostasReais =
              typeof dadosSalvos.conteudo === "string"
                ? JSON.parse(dadosSalvos.conteudo)
                : dadosSalvos;
            setRespostas((prev) => ({ ...prev, ...respostasReais }));
          }
          setStatusMsg("");
        } else {
          alert("Documento não encontrado");
          navigate("/dashboard");
        }
      } catch (erro) {
        console.error(erro);
        setStatusMsg("Erro de conexão");
      }
    };
    carregarDados();
  }, [id, navigate]);

  const contratoGerado = obterModeloPorTipo(tipoDocAtual, respostas);

  const handleChange = (campo, valor) => {
    setRespostas((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUsuario(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSalvarEBaixar = async () => {
    setStatusMsg("⏳ A processar...");
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/documento/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ conteudo: JSON.stringify(respostas) }),
      });
    } catch (erro) {
      console.error(erro);
    }

    try {
      setStatusMsg("📄 A gerar PDF...");
      const blob = await pdf(
        <PDFFile
          contrato={contratoGerado}
          plano={planoDoUsuario}
          logo={logoUsuario}
        />
      ).toBlob();
      saveAs(blob, `${contratoGerado.titulo}.pdf`);
      setStatusMsg("✅ Sucesso!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (erro) {
      setStatusMsg("❌ Erro PDF");
    }
  };

  const renderFormServicos = () => (
    <>
      <label className={styles.label}>Prestador (Você)</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Seu Nome/Empresa"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />
      <label className={styles.label}>Cliente</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Nome do Cliente"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />
      <label className={styles.label}>Descrição do Serviço</label>
      <textarea
        className={styles.input}
        rows="3"
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Valor (€)</label>
          <input
            className={styles.input}
            type="number"
            value={respostas.valor}
            onChange={(e) => handleChange("valor", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Data Fim</label>
          <input
            className={styles.input}
            type="date"
            value={respostas.prazo}
            onChange={(e) => handleChange("prazo", e.target.value)}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fff7ed",
          borderRadius: "6px",
          border: "1px solid #ffedd5",
        }}
      >
        <h4
          style={{ margin: "0 0 10px 0", color: "#9c4221", fontSize: "0.9rem" }}
        >
          Opções Pro
        </h4>
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={respostas.temConfidencialidade}
              onChange={(e) =>
                handleChange("temConfidencialidade", e.target.checked)
              }
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
            <label
              style={{ fontSize: "0.9rem", color: "#333", cursor: "pointer" }}
            >
              Adicionar Sigilo
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={respostas.temExclusividade}
              onChange={(e) =>
                handleChange("temExclusividade", e.target.checked)
              }
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
            <label
              style={{ fontSize: "0.9rem", color: "#333", cursor: "pointer" }}
            >
              Adicionar Exclusividade
            </label>
          </div>
        </div>
      </div>
    </>
  );

  const renderFormArrendamento = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#e0f2fe",
          borderRadius: "6px",
          marginBottom: "15px",
          color: "#0369a1",
          fontSize: "0.9rem",
        }}
      >
        🏠 <strong>Modo Arrendamento Ativo</strong>
      </div>
      <label className={styles.label}>Senhorio (Proprietário)</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Nome do Senhorio"
        value={respostas.senhorio}
        onChange={(e) => handleChange("senhorio", e.target.value)}
      />
      <label className={styles.label}>Inquilino</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Nome do Inquilino"
        value={respostas.inquilino}
        onChange={(e) => handleChange("inquilino", e.target.value)}
      />
      <label className={styles.label}>Morada do Imóvel</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Rua, Nº, Andar, Cidade"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Renda (€)</label>
          <input
            className={styles.input}
            type="number"
            value={respostas.valorRenda}
            onChange={(e) => handleChange("valorRenda", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Duração (Meses)</label>
          <input
            className={styles.input}
            type="number"
            value={respostas.prazoMeses}
            onChange={(e) => handleChange("prazoMeses", e.target.value)}
          />
        </div>
      </div>
      <label className={styles.label}>Data Início</label>
      <input
        className={styles.input}
        type="date"
        value={respostas.dataInicio}
        onChange={(e) => handleChange("dataInicio", e.target.value)}
      />

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fff7ed",
          borderRadius: "6px",
          border: "1px solid #ffedd5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={respostas.temFiador}
            onChange={(e) => handleChange("temFiador", e.target.checked)}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
          <label
            style={{
              fontSize: "0.9rem",
              color: "#333",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Tem Fiador?
          </label>
        </div>
        {respostas.temFiador && (
          <input
            className={styles.input}
            style={{ marginTop: "10px" }}
            type="text"
            placeholder="Nome do Fiador"
            value={respostas.nomeFiador}
            onChange={(e) => handleChange("nomeFiador", e.target.value)}
          />
        )}
      </div>
    </>
  );

  const renderFormNDA = () => (
    <>
      <label className={styles.label}>Parte Reveladora</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.parteReveladora}
        onChange={(e) => handleChange("parteReveladora", e.target.value)}
      />
      <label className={styles.label}>Parte Receptora</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.parteReceptora}
        onChange={(e) => handleChange("parteReceptora", e.target.value)}
      />
      <label className={styles.label}>Objetivo</label>
      <textarea
        className={styles.input}
        rows="2"
        value={respostas.objetivo}
        onChange={(e) => handleChange("objetivo", e.target.value)}
      />
      <label className={styles.label}>Multa (€)</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.multa}
        onChange={(e) => handleChange("multa", e.target.value)}
      />
    </>
  );

  // --- NOVO: Formulário para Proposta Comercial ---
  const renderFormProposta = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#f0fdf4",
          color: "#166534",
          marginBottom: "15px",
          borderRadius: "6px",
        }}
      >
        💼 <strong>Modo Proposta Comercial</strong>
      </div>
      <label className={styles.label}>Sua Empresa (Fornecedor)</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />

      <label className={styles.label}>Cliente (Destinatário)</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />

      <label className={styles.label}>O que será entregue? (Escopo)</label>
      <textarea
        className={styles.input}
        rows="3"
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Valor Total (€)</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.valor}
            onChange={(e) => handleChange("valor", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Validade (Ex: 15 dias)</label>
          <input
            className={styles.input}
            type="text"
            placeholder="15 dias"
            value={respostas.validadeProposta}
            onChange={(e) => handleChange("validadeProposta", e.target.value)}
          />
        </div>
      </div>

      <label className={styles.label}>Condições de Pagamento</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Ex: 50% entrada, 50% final"
        value={respostas.condicoesPagamento}
        onChange={(e) => handleChange("condicoesPagamento", e.target.value)}
      />
    </>
  );

  // --- NOVO: Formulário para Orçamento de Obras ---
  const renderFormOrcamento = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#fffBEB",
          color: "#B45309",
          marginBottom: "15px",
          borderRadius: "6px",
        }}
      >
        🔨 <strong>Modo Orçamento de Obras</strong>
      </div>
      <label className={styles.label}>Empreiteiro / Profissional</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />

      <label className={styles.label}>Cliente</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />

      <label className={styles.label}>Local da Obra</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />

      <label className={styles.label}>Descrição dos Serviços</label>
      <textarea
        className={styles.input}
        rows="3"
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />

      <label className={styles.label}>Materiais (Quem compra?)</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Ex: Cliente fornece tintas..."
        value={respostas.materiais}
        onChange={(e) => handleChange("materiais", e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Valor Mão de Obra (€)</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.valor}
            onChange={(e) => handleChange("valor", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Prazo Estimado</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Ex: 2 semanas"
            value={respostas.prazo}
            onChange={(e) => handleChange("prazo", e.target.value)}
          />
        </div>
      </div>
    </>
  );

  // --- NOVO: Formulário para Contrato de Trabalho ---
  const renderFormTrabalho = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#eef2ff",
          color: "#3730a3",
          marginBottom: "15px",
          borderRadius: "6px",
        }}
      >
        👔 <strong>Modo Recursos Humanos</strong>
      </div>
      <label className={styles.label}>Empregador (Empresa)</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.empregador}
        onChange={(e) => handleChange("empregador", e.target.value)}
      />

      <label className={styles.label}>Trabalhador</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.trabalhador}
        onChange={(e) => handleChange("trabalhador", e.target.value)}
      />

      <label className={styles.label}>Função / Cargo</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Ex: Administrativo de 1ª"
        value={respostas.funcao}
        onChange={(e) => handleChange("funcao", e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Salário Base (€)</label>
          <input
            className={styles.input}
            type="number"
            value={respostas.salario}
            onChange={(e) => handleChange("salario", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Data Início</label>
          <input
            className={styles.input}
            type="date"
            value={respostas.dataInicio}
            onChange={(e) => handleChange("dataInicio", e.target.value)}
          />
        </div>
      </div>

      <label className={styles.label}>Data de Fim (Termo)</label>
      <input
        className={styles.input}
        type="date"
        value={respostas.dataFim}
        onChange={(e) => handleChange("dataFim", e.target.value)}
      />

      <label className={styles.label}>
        Motivo do Termo (Obrigatório por Lei)
      </label>
      <textarea
        className={styles.input}
        rows="3"
        placeholder="Ex: Substituição temporária de trabalhador em licença de maternidade..."
        value={respostas.motivoTermo}
        onChange={(e) => handleChange("motivoTermo", e.target.value)}
      />
      <small style={{ color: "#666" }}>
        A falta de motivo válido converte o contrato em efetivo (sem termo).
      </small>
    </>
  );

  // --- NOVO: Formulário para RGPD ---
  const renderFormRGPD = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#fdf2f8",
          color: "#831843",
          marginBottom: "15px",
          borderRadius: "6px",
        }}
      >
        🔒 <strong>Modo Compliance / RGPD</strong>
      </div>
      <label className={styles.label}>Nome da Empresa/Entidade</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.empresa}
        onChange={(e) => handleChange("empresa", e.target.value)}
      />

      <label className={styles.label}>Website (URL)</label>
      <input
        className={styles.input}
        type="text"
        placeholder="www.minhaempresa.pt"
        value={respostas.site}
        onChange={(e) => handleChange("site", e.target.value)}
      />

      <label className={styles.label}>Email para Proteção de Dados (DPO)</label>
      <input
        className={styles.input}
        type="email"
        placeholder="dados@minhaempresa.pt"
        value={respostas.emailDPO}
        onChange={(e) => handleChange("emailDPO", e.target.value)}
      />
    </>
  );

  if (!tipoDocAtual)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        A carregar documento...
      </div>
    );

  return (
    <div className={styles.editorContainer}>
      <div className={styles.formArea}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              cursor: "pointer",
              border: "none",
              background: "transparent",
              fontWeight: "bold",
            }}
          >
            ⬅ Voltar
          </button>
          <span
            style={{ fontSize: "0.8rem", color: "orange", fontWeight: "bold" }}
          >
            {statusMsg}
          </span>
        </div>

        <h2>Dados do Documento</h2>
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "20px" }}>
          Preencha os campos abaixo.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {(tipoDocAtual === "contrato" || tipoDocAtual === "servicos") &&
            renderFormServicos()}
          {tipoDocAtual === "imobiliario" && renderFormArrendamento()}
          {(tipoDocAtual === "nda" || tipoDocAtual === "juridico") &&
            renderFormNDA()}
          {tipoDocAtual === "proposta" && renderFormProposta()}
          {tipoDocAtual === "orcamento" && renderFormOrcamento()}
          {/* CORRIGIDO AQUI: As linhas abaixo estavam no lugar errado antes */}
          {tipoDocAtual === "trabalho" && renderFormTrabalho()}
          {tipoDocAtual === "rgpd" && renderFormRGPD()}

          <label className={styles.label}>Comarca (Tribunal)</label>
          <select
            className={styles.input}
            value={respostas.comarca}
            onChange={(e) => handleChange("comarca", e.target.value)}
          >
            <option value="Lisboa">Lisboa</option>
            <option value="Porto">Porto</option>
            <option value="Faro">Faro</option>
          </select>

          {planoDoUsuario === "pro" && (
            <div
              style={{
                marginTop: "15px",
                borderTop: "1px dashed #ffedd5",
                paddingTop: "15px",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "#9c4221",
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Seu Logótipo (Pro)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ fontSize: "0.8rem" }}
              />
            </div>
          )}
        </div>

        <button
          className={styles.botaoUsar}
          style={{ marginTop: "30px", width: "100%" }}
          onClick={handleSalvarEBaixar}
        >
          💾 Salvar e Gerar PDF
        </button>
      </div>

      <div className={styles.previewArea}>
        <div className={styles.folhaA4}>
          {planoDoUsuario === "pro" && logoUsuario && (
            <img
              src={logoUsuario}
              alt="Logo"
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                width: "60px",
                height: "60px",
                objectFit: "contain",
              }}
            />
          )}
          <h1
            style={{
              textAlign: "center",
              fontSize: "1.4em",
              marginBottom: "30px",
              marginTop: "20px",
              textTransform: "uppercase",
            }}
          >
            {contratoGerado.titulo}
          </h1>
          {contratoGerado.clausulas.map((clausula, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <strong style={{ display: "block", marginBottom: "5px" }}>
                {clausula.titulo}
              </strong>
              <div style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}>
                {clausula.texto}
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div
              style={{
                borderTop: "1px solid #000",
                width: "45%",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              {contratoGerado.assinantes
                ? contratoGerado.assinantes.parte1
                : "Primeira Parte"}
            </div>
            <div
              style={{
                borderTop: "1px solid #000",
                width: "45%",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              {contratoGerado.assinantes
                ? contratoGerado.assinantes.parte2
                : "Segunda Parte"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
