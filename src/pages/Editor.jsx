import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obterModeloPorTipo } from "../modelos/GerenciadorModelos.js";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFFile from "../components/PDFFile.jsx";
import styles from "../components/Biblioteca.module.css";

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("A carregar...");
  const [logoUsuario, setLogoUsuario] = useState(null);

  const [tipoDocAtual, setTipoDocAtual] = useState("");

  // Estado Gigante para cobrir todos os modelos
  const [respostas, setRespostas] = useState({
    // --- CAMPOS GERAIS ---
    comarca: "Lisboa",

    // --- PRESTAÇÃO DE SERVIÇOS / GERAL ---
    prestador: "",
    prestadorNIF: "",
    prestadorMorada: "",
    prestadorCC: "", // Usado em procurações
    cliente: "",
    clienteNIF: "",
    clienteMorada: "",
    clienteCC: "", // Usado em procurações
    descricaoServico: "", // Usado também como 'Lista de Sócios' na Ata ou 'Poderes' na Procuração
    valor: "", // Usado também como 'Capital Social' na Ata
    prazo: "", // Usado como 'Data Fim', 'Hora da Ata', ou 'Dias de Aviso Prévio'

    // --- IMOBILIÁRIO ---
    senhorio: "",
    senhorioNIF: "",
    senhorioCC: "",
    senhorioMorada: "",
    inquilino: "",
    inquilinoNIF: "",
    inquilinoCC: "",
    inquilinoMorada: "",
    moradaImovel: "",
    valorRenda: "", // Usado também como 'Resultado do Exercício' na Ata
    dataInicio: "",
    prazoMeses: "12",
    temFiador: false,
    nomeFiador: "",
    fiadorNIF: "",

    // --- CPCV ---
    valorSinal: "",
    artigoMatricial: "",
    conservatoria: "",
    numeroPredial: "",

    // --- RH / TRABALHO / DOMÉSTICO (PREMIUM) ---
    empregador: "",
    nifEmpregador: "",
    moradaEmpregador: "",
    trabalho: "", // Usado para 'Trabalhador'
    trabalhador: "",
    nifTrabalhador: "",
    nissTrabalhador: "", // Segurança Social
    moradaTrabalhador: "",
    funcao: "",
    salario: "",
    dataFim: "",
    motivoTermo: "",
    clausulasExtras: "", // <--- NOVO: Campo para cláusulas livres

    // --- EXTRAS / JURÍDICO ---
    parteReveladora: "",
    parteReceptora: "",
    objetivo: "",
    multa: "10.000",
    temConfidencialidade: false,
    temExclusividade: false,
    empresa: "", // Usado na Ata e RGPD
    site: "",
    emailDPO: "",
    validadeProposta: "",
    condicoesPagamento: "",
    credor: "",
    devedor: "",
    dataPagamento: "",
    metodoPagamento: "",

    // --- VEÍCULOS ---
    vendedor: "",
    vendedorNIF: "",
    vendedorMorada: "",
    vendedorCC: "",
    comprador: "",
    compradorNIF: "",
    compradorMorada: "",
    compradorCC: "",
    marca: "",
    modelo: "",
    matricula: "",
    chassis: "",
    km: "",

    // --- CARTAS ---
    role: "senhorio", // Para saber quem envia a carta (senhorio/inquilino)
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
          console.warn("Documento não encontrado ou backend offline");
          setStatusMsg("");
        }
      } catch (erro) {
        console.error(erro);
        setStatusMsg("Erro de conexão");
      }
    };
    carregarDados();
  }, [id, navigate]);

  const contratoGerado = obterModeloPorTipo(tipoDocAtual, respostas);

  const handleChange = (campo, valor) =>
    setRespostas((prev) => ({ ...prev, [campo]: valor }));

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
      console.error(erro);
      setStatusMsg("❌ Erro PDF");
    }
  };

  // ===============================================
  // --- SEÇÃO DE RENDERIZAÇÃO DE FORMULÁRIOS ---
  // ===============================================

  const renderFormServicos = () => (
    <>
      <h4 style={{ marginTop: "10px", color: "#4b5563" }}>Prestador (Você)</h4>
      <label className={styles.label}>Nome / Empresa</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />
      <label className={styles.label}>NIF</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestadorNIF}
        onChange={(e) => handleChange("prestadorNIF", e.target.value)}
      />
      <label className={styles.label}>Morada / Sede</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestadorMorada}
        onChange={(e) => handleChange("prestadorMorada", e.target.value)}
      />

      <h4 style={{ marginTop: "15px", color: "#4b5563" }}>Cliente</h4>
      <label className={styles.label}>Nome / Empresa</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />
      <label className={styles.label}>NIF</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.clienteNIF}
        onChange={(e) => handleChange("clienteNIF", e.target.value)}
      />
      <label className={styles.label}>Morada / Sede</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.clienteMorada}
        onChange={(e) => handleChange("clienteMorada", e.target.value)}
      />

      <h4 style={{ marginTop: "15px", color: "#4b5563" }}>Detalhes</h4>
      <label className={styles.label}>Descrição do Serviço</label>
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
            type="number"
            value={respostas.valor}
            onChange={(e) => handleChange("valor", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Data Fim (Opcional)</label>
          <input
            className={styles.input}
            type="date"
            value={respostas.prazo}
            onChange={(e) => handleChange("prazo", e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={respostas.temConfidencialidade}
            onChange={(e) =>
              handleChange("temConfidencialidade", e.target.checked)
            }
          />{" "}
          Incluir Confidencialidade?
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={respostas.temExclusividade}
            onChange={(e) => handleChange("temExclusividade", e.target.checked)}
          />{" "}
          Incluir Exclusividade?
        </label>
      </div>
    </>
  );

  const renderFormAta = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#f3e8ff",
          borderRadius: "6px",
          marginBottom: "15px",
          color: "#6b21a8",
        }}
      >
        📜 <strong>Ata de Assembleia Geral</strong>
      </div>

      <label className={styles.label}>Nome da Empresa</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.empresa}
        onChange={(e) => handleChange("empresa", e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>NIPC (NIF)</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.nifEmpregador}
            onChange={(e) => handleChange("nifEmpregador", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Capital Social (€)</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.valor}
            onChange={(e) => handleChange("valor", e.target.value)}
          />
        </div>
      </div>

      <label className={styles.label}>Sede Social</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />

      <label className={styles.label}>Hora da Reunião</label>
      <input
        className={styles.input}
        type="time"
        value={respostas.prazo}
        onChange={(e) => handleChange("prazo", e.target.value)}
      />

      <label className={styles.label}>Presidente da Mesa</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />

      <label className={styles.label}>
        Lista de Sócios e Quotas (Separar por ponto e vírgula)
      </label>
      <textarea
        className={styles.input}
        rows="3"
        placeholder="Ex: João Silva (50%); Maria Santos (50%)."
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />

      <label className={styles.label}>Resultado do Exercício (Texto)</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Ex: lucro de 10.000€ ou prejuízo de 500€"
        value={respostas.valorRenda}
        onChange={(e) => handleChange("valorRenda", e.target.value)}
      />
    </>
  );

  const renderFormProcuracao = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#fae8ff",
          borderRadius: "6px",
          marginBottom: "15px",
          color: "#86198f",
        }}
      >
        ⚖️ <strong>Procuração Forense/Geral</strong>
      </div>

      <h4 style={{ marginTop: "10px" }}>Mandante (Quem passa poderes)</h4>
      <label className={styles.label}>Nome Completo</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>NIF</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.prestadorNIF}
            onChange={(e) => handleChange("prestadorNIF", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>CC/BI</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.prestadorCC}
            onChange={(e) => handleChange("prestadorCC", e.target.value)}
          />
        </div>
      </div>
      <label className={styles.label}>Morada</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prestadorMorada}
        onChange={(e) => handleChange("prestadorMorada", e.target.value)}
      />

      <h4 style={{ marginTop: "10px" }}>Mandatário (Quem recebe)</h4>
      <label className={styles.label}>Nome Completo</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>NIF</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.clienteNIF}
            onChange={(e) => handleChange("clienteNIF", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>CC/BI</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.clienteCC}
            onChange={(e) => handleChange("clienteCC", e.target.value)}
          />
        </div>
      </div>
      <label className={styles.label}>Morada</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.clienteMorada}
        onChange={(e) => handleChange("clienteMorada", e.target.value)}
      />

      <label className={styles.label}>Descrição dos Poderes</label>
      <textarea
        className={styles.input}
        rows="4"
        placeholder="Ex: Poderes para vender o imóvel X, movimentar contas bancárias, etc."
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />

      <label style={{ marginTop: "10px", display: "block" }}>
        <input
          type="checkbox"
          checked={respostas.temConfidencialidade}
          onChange={(e) =>
            handleChange("temConfidencialidade", e.target.checked)
          }
        />
        Permite substabelecimento? (Passar poderes a outro)
      </label>
    </>
  );

  const renderFormCartas = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#fee2e2",
          borderRadius: "6px",
          marginBottom: "15px",
          color: "#991b1b",
        }}
      >
        📬 <strong>Modo Carta Registada</strong>
      </div>

      {tipoDocAtual === "oposicao" && (
        <div style={{ marginBottom: "15px" }}>
          <label className={styles.label}>Quem está a escrever?</label>
          <select
            className={styles.input}
            value={respostas.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="senhorio">Sou o Senhorio</option>
            <option value="inquilino">Sou o Inquilino</option>
          </select>
        </div>
      )}

      <h4 style={{ marginTop: "10px" }}>Remetente (Você)</h4>
      <label className={styles.label}>Nome</label>
      <input
        className={styles.input}
        type="text"
        value={
          tipoDocAtual === "rescisao_trabalho"
            ? respostas.trabalhador
            : respostas.role === "senhorio"
            ? respostas.senhorio
            : respostas.inquilino
        }
        onChange={(e) => {
          if (tipoDocAtual === "rescisao_trabalho")
            handleChange("trabalhador", e.target.value);
          else if (respostas.role === "senhorio")
            handleChange("senhorio", e.target.value);
          else handleChange("inquilino", e.target.value);
        }}
      />

      <label className={styles.label}>Morada</label>
      <input
        className={styles.input}
        type="text"
        value={
          tipoDocAtual === "rescisao_trabalho"
            ? respostas.moradaTrabalhador
            : respostas.role === "senhorio"
            ? respostas.senhorioMorada
            : respostas.inquilinoMorada
        }
        onChange={(e) => {
          if (tipoDocAtual === "rescisao_trabalho")
            handleChange("moradaTrabalhador", e.target.value);
          else if (respostas.role === "senhorio")
            handleChange("senhorioMorada", e.target.value);
          else handleChange("inquilinoMorada", e.target.value);
        }}
      />

      <h4 style={{ marginTop: "15px" }}>Destinatário</h4>
      <label className={styles.label}>Nome / Entidade</label>
      <input
        className={styles.input}
        type="text"
        value={
          tipoDocAtual === "rescisao_trabalho"
            ? respostas.empregador
            : respostas.role === "senhorio"
            ? respostas.inquilino
            : respostas.senhorio
        }
        onChange={(e) => {
          if (tipoDocAtual === "rescisao_trabalho")
            handleChange("empregador", e.target.value);
          else if (respostas.role === "senhorio")
            handleChange("inquilino", e.target.value);
          else handleChange("senhorio", e.target.value);
        }}
      />

      <label className={styles.label}>Morada</label>
      <input
        className={styles.input}
        type="text"
        value={
          tipoDocAtual === "rescisao_trabalho"
            ? respostas.moradaEmpregador
            : respostas.role === "senhorio"
            ? respostas.inquilinoMorada
            : respostas.senhorioMorada
        }
        onChange={(e) => {
          if (tipoDocAtual === "rescisao_trabalho")
            handleChange("moradaEmpregador", e.target.value);
          else if (respostas.role === "senhorio")
            handleChange("inquilinoMorada", e.target.value);
          else handleChange("senhorioMorada", e.target.value);
        }}
      />

      <label className={styles.label}>
        {tipoDocAtual === "oposicao"
          ? "Morada do Imóvel"
          : "Data Fim do Contrato"}
      </label>
      <input
        className={styles.input}
        type="text"
        value={
          tipoDocAtual === "oposicao"
            ? respostas.moradaImovel
            : respostas.dataFim
        }
        onChange={(e) =>
          handleChange(
            tipoDocAtual === "oposicao" ? "moradaImovel" : "dataFim",
            e.target.value
          )
        }
      />

      <label className={styles.label}>
        {tipoDocAtual === "oposicao"
          ? "Data Fim do Contrato"
          : "Dias de Aviso Prévio (30 ou 60)"}
      </label>
      <input
        className={styles.input}
        type="text"
        value={respostas.prazo}
        onChange={(e) => handleChange("prazo", e.target.value)}
      />
    </>
  );

  const renderFormTrabalho = (isDomestico = false) => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#eef2ff",
          borderRadius: "6px",
          marginBottom: "15px",
          color: "#3730a3",
        }}
      >
        👔{" "}
        <strong>
          {isDomestico ? "Contrato Serviço Doméstico" : "Contrato de Trabalho"}
        </strong>
      </div>

      <h4 style={{ marginTop: "10px" }}>Empregador</h4>
      <label className={styles.label}>Nome / Empresa</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.empregador}
        onChange={(e) => handleChange("empregador", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>NIF</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.nifEmpregador}
            onChange={(e) => handleChange("nifEmpregador", e.target.value)}
          />
        </div>
      </div>
      <label className={styles.label}>Morada / Sede</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.moradaEmpregador}
        onChange={(e) => handleChange("moradaEmpregador", e.target.value)}
      />

      <h4 style={{ marginTop: "15px" }}>Trabalhador</h4>
      <label className={styles.label}>Nome Completo</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.trabalhador}
        onChange={(e) => handleChange("trabalhador", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>NIF</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.nifTrabalhador}
            onChange={(e) => handleChange("nifTrabalhador", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>NISS (Seg. Social)</label>
          <input
            className={styles.input}
            type="text"
            value={respostas.nissTrabalhador}
            onChange={(e) => handleChange("nissTrabalhador", e.target.value)}
          />
        </div>
      </div>
      <label className={styles.label}>Morada</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.moradaTrabalhador}
        onChange={(e) => handleChange("moradaTrabalhador", e.target.value)}
      />

      <h4 style={{ marginTop: "15px" }}>Condições</h4>
      <label className={styles.label}>
        {isDomestico ? "Funções / Tarefas" : "Categoria Profissional"}
      </label>
      <input
        className={styles.input}
        type="text"
        value={isDomestico ? respostas.descricaoServico : respostas.funcao}
        onChange={(e) =>
          handleChange(
            isDomestico ? "descricaoServico" : "funcao",
            e.target.value
          )
        }
      />

      {/* Se for doméstico, pede local, senão usa o 'moradaImovel' como sede */}
      <label className={styles.label}>Local de Trabalho</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Salário (€)</label>
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

      {tipoDocAtual === "trabalho" && (
        <>
          <label className={styles.label}>Data Fim (Termo)</label>
          <input
            className={styles.input}
            type="date"
            value={respostas.dataFim}
            onChange={(e) => handleChange("dataFim", e.target.value)}
          />
          <label className={styles.label}>Motivo do Termo</label>
          <textarea
            className={styles.input}
            rows="2"
            placeholder="Ex: Acréscimo de trabalho..."
            value={respostas.motivoTermo}
            onChange={(e) => handleChange("motivoTermo", e.target.value)}
          />
        </>
      )}

      {/* --- OPÇÕES PREMIUM --- */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
        }}
      >
        <h5 style={{ margin: "0 0 10px 0", color: "#4b5563" }}>
          Opções Avançadas
        </h5>
        <label style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="checkbox"
            checked={respostas.temConfidencialidade}
            onChange={(e) =>
              handleChange("temConfidencialidade", e.target.checked)
            }
          />{" "}
          Incluir Cláusula de Confidencialidade?
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={respostas.temExclusividade}
            onChange={(e) => handleChange("temExclusividade", e.target.checked)}
          />{" "}
          Incluir Cláusula de Exclusividade?
        </label>

        <label className={styles.label}>
          Cláusulas Adicionais (Texto Livre)
        </label>
        <textarea
          className={styles.input}
          rows="3"
          placeholder="Escreva aqui regras específicas da empresa (ex: uso de viatura, fardamento, etc). Aparecerá no contrato como 'Cláusula de Disposições Específicas'."
          value={respostas.clausulasExtras}
          onChange={(e) => handleChange("clausulasExtras", e.target.value)}
        />
      </div>
    </>
  );

  const renderFormVeiculo = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#d1fae5",
          color: "#065f46",
          marginBottom: "15px",
          borderRadius: "6px",
        }}
      >
        🚗 <strong>Venda de Veículo</strong>
      </div>
      <label className={styles.label}>Marca e Modelo</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          className={styles.input}
          placeholder="Marca"
          value={respostas.marca}
          onChange={(e) => handleChange("marca", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Modelo"
          value={respostas.modelo}
          onChange={(e) => handleChange("modelo", e.target.value)}
        />
      </div>
      <label className={styles.label}>Matrícula e VIN</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          className={styles.input}
          placeholder="Matrícula"
          value={respostas.matricula}
          onChange={(e) => handleChange("matricula", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="VIN / Chassis"
          value={respostas.chassis}
          onChange={(e) => handleChange("chassis", e.target.value)}
        />
      </div>
      <label className={styles.label}>Quilómetros</label>
      <input
        className={styles.input}
        type="text"
        value={respostas.km}
        onChange={(e) => handleChange("km", e.target.value)}
      />
      <label className={styles.label}>Valor (€)</label>
      <input
        className={styles.input}
        type="number"
        value={respostas.valor}
        onChange={(e) => handleChange("valor", e.target.value)}
      />

      <h4 style={{ marginTop: 10 }}>Vendedor</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.vendedor}
        onChange={(e) => handleChange("vendedor", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="NIF"
          value={respostas.vendedorNIF}
          onChange={(e) => handleChange("vendedorNIF", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="CC"
          value={respostas.vendedorCC}
          onChange={(e) => handleChange("vendedorCC", e.target.value)}
        />
      </div>
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.vendedorMorada}
        onChange={(e) => handleChange("vendedorMorada", e.target.value)}
      />

      <h4 style={{ marginTop: 10 }}>Comprador</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.comprador}
        onChange={(e) => handleChange("comprador", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="NIF"
          value={respostas.compradorNIF}
          onChange={(e) => handleChange("compradorNIF", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="CC"
          value={respostas.compradorCC}
          onChange={(e) => handleChange("compradorCC", e.target.value)}
        />
      </div>
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.compradorMorada}
        onChange={(e) => handleChange("compradorMorada", e.target.value)}
      />
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
        }}
      >
        🏠 <strong>Arrendamento</strong>
      </div>
      <h4 style={{ marginTop: 10 }}>Senhorio</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.senhorio}
        onChange={(e) => handleChange("senhorio", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="NIF"
          value={respostas.senhorioNIF}
          onChange={(e) => handleChange("senhorioNIF", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="CC"
          value={respostas.senhorioCC}
          onChange={(e) => handleChange("senhorioCC", e.target.value)}
        />
      </div>
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.senhorioMorada}
        onChange={(e) => handleChange("senhorioMorada", e.target.value)}
      />

      <h4 style={{ marginTop: 10 }}>Inquilino</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.inquilino}
        onChange={(e) => handleChange("inquilino", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="NIF"
          value={respostas.inquilinoNIF}
          onChange={(e) => handleChange("inquilinoNIF", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="CC"
          value={respostas.inquilinoCC}
          onChange={(e) => handleChange("inquilinoCC", e.target.value)}
        />
      </div>
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.inquilinoMorada}
        onChange={(e) => handleChange("inquilinoMorada", e.target.value)}
      />

      <h4 style={{ marginTop: 10 }}>Imóvel</h4>
      <input
        className={styles.input}
        placeholder="Morada Imóvel"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          type="number"
          placeholder="Renda €"
          value={respostas.valorRenda}
          onChange={(e) => handleChange("valorRenda", e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Meses"
          value={respostas.prazoMeses}
          onChange={(e) => handleChange("prazoMeses", e.target.value)}
        />
      </div>
      <label className={styles.label}>Data Início</label>
      <input
        className={styles.input}
        type="date"
        value={respostas.dataInicio}
        onChange={(e) => handleChange("dataInicio", e.target.value)}
      />
    </>
  );

  const renderFormCPCV = () => (
    <>
      <div
        style={{
          padding: "10px",
          background: "#fef3c7",
          color: "#92400e",
          marginBottom: "15px",
          borderRadius: "6px",
        }}
      >
        🏠 <strong>CPCV (Promessa)</strong>
      </div>
      <h4 style={{ marginTop: 10 }}>Vendedor</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.vendedor}
        onChange={(e) => handleChange("vendedor", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="NIF"
        value={respostas.vendedorNIF}
        onChange={(e) => handleChange("vendedorNIF", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.vendedorMorada}
        onChange={(e) => handleChange("vendedorMorada", e.target.value)}
      />

      <h4 style={{ marginTop: 10 }}>Comprador</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.comprador}
        onChange={(e) => handleChange("comprador", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="NIF"
        value={respostas.compradorNIF}
        onChange={(e) => handleChange("compradorNIF", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.compradorMorada}
        onChange={(e) => handleChange("compradorMorada", e.target.value)}
      />

      <h4 style={{ marginTop: 10 }}>Dados</h4>
      <input
        className={styles.input}
        placeholder="Morada Imóvel"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="Artigo"
          value={respostas.artigoMatricial}
          onChange={(e) => handleChange("artigoMatricial", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Registo Predial"
          value={respostas.numeroPredial}
          onChange={(e) => handleChange("numeroPredial", e.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          type="number"
          placeholder="Valor Total"
          value={respostas.valor}
          onChange={(e) => handleChange("valor", e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Sinal"
          value={respostas.valorSinal}
          onChange={(e) => handleChange("valorSinal", e.target.value)}
        />
      </div>
      <label className={styles.label}>Prazo Escritura (Dias)</label>
      <input
        className={styles.input}
        type="number"
        value={respostas.prazo}
        onChange={(e) => handleChange("prazo", e.target.value)}
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
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {(tipoDocAtual === "contrato" ||
            tipoDocAtual === "servicos" ||
            tipoDocAtual === "proposta" ||
            tipoDocAtual === "orcamento") &&
            renderFormServicos()}
          {tipoDocAtual === "imobiliario" && renderFormArrendamento()}
          {tipoDocAtual === "cpcv" && renderFormCPCV()}
          {tipoDocAtual === "veiculo" && renderFormVeiculo()}

          {/* AQUI ESTÃO OS NOVOS: */}
          {(tipoDocAtual === "trabalho" ||
            tipoDocAtual === "trabalho_efetivo") &&
            renderFormTrabalho(false)}
          {tipoDocAtual === "domestico" && renderFormTrabalho(true)}
          {(tipoDocAtual === "oposicao" ||
            tipoDocAtual === "rescisao_trabalho") &&
            renderFormCartas()}
          {tipoDocAtual === "ata_assembleia" && renderFormAta()}
          {tipoDocAtual === "procuracao" && renderFormProcuracao()}

          <label className={styles.label}>Comarca / Local da Assinatura</label>
          <select
            className={styles.input}
            value={respostas.comarca}
            onChange={(e) => handleChange("comarca", e.target.value)}
          >
            <option value="Lisboa">Lisboa</option>
            <option value="Porto">Porto</option>
            <option value="Faro">Faro</option>
            <option value="Coimbra">Coimbra</option>
            <option value="Braga">Braga</option>
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
          style={{ marginTop: "30px" }}
          onClick={handleSalvarEBaixar}
        >
          💾 Salvar e Gerar PDF
        </button>
      </div>

      <div className={styles.previewArea}>
        <PDFViewer
          style={{ width: "100%", height: "100%", border: "none" }}
          showToolbar={true}
        >
          <PDFFile
            contrato={contratoGerado}
            plano={planoDoUsuario}
            logo={logoUsuario}
          />
        </PDFViewer>
      </div>
    </div>
  );
}

export default Editor;
