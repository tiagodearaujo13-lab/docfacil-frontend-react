import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obterModeloPorTipo } from "../modelos/GerenciadorModelos.js";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFFile from "../components/PDFFile.jsx";
import styles from "./Biblioteca.module.css";

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("A carregar...");
  const [logoUsuario, setLogoUsuario] = useState(null);
  const [tipoDocAtual, setTipoDocAtual] = useState("");
  const [planoDoUsuario, setPlanoDoUsuario] = useState("free");

  // Estado para detetar se é telemóvel
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Define a URL base exatamente como você tinha (sem variáveis de ambiente)
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://meu-backend-api-rohr.onrender.com";

  // Estado Gigante para cobrir todos os modelos - ATUALIZADO COM NOVOS CAMPOS
  const [respostas, setRespostas] = useState({
    comarca: "Lisboa",
    prestador: "",
    prestadorNIF: "",
    prestadorMorada: "",
    prestadorCC: "",
    cliente: "",
    clienteNIF: "",
    clienteMorada: "",
    clienteCC: "",
    descricaoServico: "",
    valor: "",
    prazo: "",
    senhorio: "",
    senhorioNIF: "",
    senhorioCC: "",
    senhorioMorada: "",
    inquilino: "",
    inquilinoNIF: "",
    inquilinoCC: "",
    inquilinoMorada: "",
    moradaImovel: "",
    valorRenda: "",
    dataInicio: "",
    prazoMeses: "12",
    temFiador: false,
    nomeFiador: "",
    fiadorNIF: "",
    fiadorMorada: "", // NOVO CAMPO: Morada do fiador
    valorCaucao: "", // NOVO CAMPO: Valor da caução (obrigatório por lei)
    valorSinal: "",
    artigoMatricial: "",
    conservatoria: "",
    numeroPredial: "",
    empregador: "",
    nifEmpregador: "",
    moradaEmpregador: "",
    trabalho: "",
    trabalhador: "",
    nifTrabalhador: "",
    nissTrabalhador: "",
    ibanTrabalhador: "",
    moradaTrabalhador: "",
    funcao: "",
    salario: "",
    dataFim: "",
    motivoTermo: "",
    clausulasExtras: "",
    parteReveladora: "",
    parteReceptora: "",
    objetivo: "",
    multa: "10.000",
    temConfidencialidade: false,
    temExclusividade: false,
    empresa: "",
    site: "",
    emailDPO: "",
    validadeProposta: "",
    condicoesPagamento: "",
    credor: "",
    devedor: "",
    dataPagamento: "",
    metodoPagamento: "",
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
    role: "senhorio",
    estadoCivilSenhorio: "Casado(a)/Solteiro(a)", // NOVO CAMPO: Estado civil do senhorio
    licencaUtilizacao: "", // NOVO CAMPO: Licença de utilização
    certEnergetico: "", // NOVO CAMPO: Certificado energético
    renovavel: true, // NOVO CAMPO: Contrato renovável (padrão true)
  });

  // ESTADO NOVO: Guarda a versão do contrato pronta para o PDF (com atraso)
  const [contratoParaPDF, setContratoParaPDF] = useState(null);

  // --- SOLUÇÃO DO BUG ---
  // Esta chave força o PDFViewer a reiniciar do zero quando o conteúdo muda
  const [pdfKey, setPdfKey] = useState(0);

  // Detectar mudança de tamanho de tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = localStorage.getItem("token");

        // Usa a constante API_URL definida no início
        const respostaDoc = await fetch(`${API_URL}/documento/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const respostaPerfil = await fetch(`${API_URL}/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (respostaDoc.ok) {
          const doc = await respostaDoc.json();
          setTipoDocAtual(doc.tipo_documento);

          if (respostaPerfil.ok) {
            const perfil = await respostaPerfil.json();
            setPlanoDoUsuario(perfil.plano || "free");
          }

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
          setStatusMsg("");
        }
      } catch (erro) {
        console.error(erro);
        setStatusMsg("Erro de conexão");
      }
    };
    carregarDados();
  }, [id, navigate, API_URL]);

  // --- CORREÇÃO DO BUG (DEBOUNCE + FORÇAR RENDER) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tipoDocAtual) {
        const modeloGerado = obterModeloPorTipo(tipoDocAtual, respostas);
        setContratoParaPDF(modeloGerado);
        // Atualiza a chave para forçar o componente PDF a recriar-se
        // Isso impede o erro "Eo is not a function"
        setPdfKey((prev) => prev + 1);
      }
    }, 1000); // Aguarda 1 segundo após a última alteração

    return () => clearTimeout(timer);
  }, [respostas, tipoDocAtual]);

  // Função helper para inputs
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
    // Para salvar, usamos o estado atual direto (respostas)
    const contratoFinal = obterModeloPorTipo(tipoDocAtual, respostas);

    setStatusMsg("⏳ A processar...");

    try {
      const token = localStorage.getItem("token");
      // Usa a constante API_URL
      await fetch(`${API_URL}/documento/${id}`, {
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
          contrato={contratoFinal}
          plano={planoDoUsuario}
          logo={logoUsuario}
        />
      ).toBlob();
      saveAs(blob, `${contratoFinal.titulo}.pdf`);
      setStatusMsg("✅ Sucesso!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (erro) {
      console.error(erro);
      setStatusMsg("❌ Erro PDF");
    }
  };

  // --- RENDERIZADORES ---

  const renderFormServicos = () => (
    <>
      <h4 style={{ marginTop: "10px" }}>Prestador</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="NIF"
        value={respostas.prestadorNIF}
        onChange={(e) => handleChange("prestadorNIF", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.prestadorMorada}
        onChange={(e) => handleChange("prestadorMorada", e.target.value)}
      />
      <h4 style={{ marginTop: "15px" }}>Cliente</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="NIF"
        value={respostas.clienteNIF}
        onChange={(e) => handleChange("clienteNIF", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.clienteMorada}
        onChange={(e) => handleChange("clienteMorada", e.target.value)}
      />
      <h4 style={{ marginTop: "15px" }}>Detalhes</h4>
      <textarea
        className={styles.input}
        rows="3"
        placeholder="Descrição do Serviço"
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          className={styles.input}
          type="number"
          placeholder="Valor €"
          value={respostas.valor}
          onChange={(e) => handleChange("valor", e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          value={respostas.prazo}
          onChange={(e) => handleChange("prazo", e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={respostas.temConfidencialidade}
            onChange={(e) =>
              handleChange("temConfidencialidade", e.target.checked)
            }
          />{" "}
          Confidencialidade
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={respostas.temExclusividade}
            onChange={(e) => handleChange("temExclusividade", e.target.checked)}
          />{" "}
          Exclusividade
        </label>
      </div>
      <textarea
        className={styles.input}
        rows="2"
        placeholder="Cláusulas Extras"
        value={respostas.clausulasExtras}
        onChange={(e) => handleChange("clausulasExtras", e.target.value)}
        style={{ marginTop: 10 }}
      />
    </>
  );

  const renderFormArrendamento = () => (
    <>
      <h4>Senhorio</h4>
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

      {/* NOVO CAMPO: Estado Civil do Senhorio */}
      <select
        className={styles.input}
        value={respostas.estadoCivilSenhorio}
        onChange={(e) => handleChange("estadoCivilSenhorio", e.target.value)}
      >
        <option value="Casado(a)/Solteiro(a)">Casado(a)/Solteiro(a)</option>
        <option value="Casado(a)">Casado(a)</option>
        <option value="Solteiro(a)">Solteiro(a)</option>
        <option value="Divorciado(a)">Divorciado(a)</option>
        <option value="Viúvo(a)">Viúvo(a)</option>
      </select>

      <h4>Inquilino</h4>
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
      <h4>Imóvel</h4>
      <input
        className={styles.input}
        placeholder="Morada Imóvel"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />

      {/* NOVOS CAMPOS: Documentação do Imóvel */}
      <input
        className={styles.input}
        placeholder="Artigo Matricial (ex: Artigo Urbano n.º 123)"
        value={respostas.artigoMatricial}
        onChange={(e) => handleChange("artigoMatricial", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Licença de Utilização"
        value={respostas.licencaUtilizacao}
        onChange={(e) => handleChange("licencaUtilizacao", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Certificado Energético"
        value={respostas.certEnergetico}
        onChange={(e) => handleChange("certEnergetico", e.target.value)}
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

      {/* NOVO CAMPO OBRIGATÓRIO: Caução */}
      <input
        className={styles.input}
        type="number"
        placeholder="Caução (obrigatório por lei)"
        value={respostas.valorCaucao}
        onChange={(e) => handleChange("valorCaucao", e.target.value)}
      />

      <input
        className={styles.input}
        type="date"
        value={respostas.dataInicio}
        onChange={(e) => handleChange("dataInicio", e.target.value)}
      />

      {/* NOVO CAMPO: Renovável */}
      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={respostas.renovavel}
            onChange={(e) => handleChange("renovavel", e.target.checked)}
          />{" "}
          Contrato Renovável Automaticamente?
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={respostas.temFiador}
            onChange={(e) => handleChange("temFiador", e.target.checked)}
          />{" "}
          Tem Fiador?
        </label>
      </div>
      {respostas.temFiador && (
        <>
          <input
            className={styles.input}
            placeholder="Nome Fiador"
            value={respostas.nomeFiador}
            onChange={(e) => handleChange("nomeFiador", e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="NIF Fiador"
            value={respostas.fiadorNIF}
            onChange={(e) => handleChange("fiadorNIF", e.target.value)}
          />
          {/* NOVO CAMPO: Morada do Fiador */}
          <input
            className={styles.input}
            placeholder="Morada Fiador"
            value={respostas.fiadorMorada}
            onChange={(e) => handleChange("fiadorMorada", e.target.value)}
          />
        </>
      )}
      <textarea
        className={styles.input}
        rows="2"
        placeholder="Cláusulas Extras"
        value={respostas.clausulasExtras}
        onChange={(e) => handleChange("clausulasExtras", e.target.value)}
        style={{ marginTop: 10 }}
      />
    </>
  );
  const renderFormTrabalho = (isDomestico = false) => (
    <>
      <h4>Empregador</h4>
      <input
        className={styles.input}
        placeholder="Nome Empresa/Empregador"
        value={respostas.empregador}
        onChange={(e) => handleChange("empregador", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="NIF"
          value={respostas.nifEmpregador}
          onChange={(e) => handleChange("nifEmpregador", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Morada Sede"
          value={respostas.moradaEmpregador}
          onChange={(e) => handleChange("moradaEmpregador", e.target.value)}
        />
      </div>

      <h4>Trabalhador</h4>
      <input
        className={styles.input}
        placeholder="Nome Completo"
        value={respostas.trabalhador}
        onChange={(e) => handleChange("trabalhador", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="NIF"
          value={respostas.nifTrabalhador}
          onChange={(e) => handleChange("nifTrabalhador", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="NISS"
          value={respostas.nissTrabalhador}
          onChange={(e) => handleChange("nissTrabalhador", e.target.value)}
        />
      </div>
      <input
        className={styles.input}
        placeholder="Morada Trabalhador"
        value={respostas.moradaTrabalhador}
        onChange={(e) => handleChange("moradaTrabalhador", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="IBAN para Pagamento"
        value={respostas.ibanTrabalhador}
        onChange={(e) => handleChange("ibanTrabalhador", e.target.value)}
      />

      <h4>Detalhes do Contrato</h4>
      <input
        className={styles.input}
        placeholder="Função / Cargo"
        value={respostas.funcao}
        onChange={(e) => handleChange("funcao", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="Salário Base (€)"
          value={respostas.salario}
          onChange={(e) => handleChange("salario", e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          placeholder="Data Início"
          value={respostas.dataInicio}
          onChange={(e) => handleChange("dataInicio", e.target.value)}
        />
      </div>

      {!isDomestico && (
        <div style={{ marginTop: 10 }}>
          <label>Data de Fim (se termo certo):</label>
          <input
            className={styles.input}
            type="date"
            value={respostas.dataFim}
            onChange={(e) => handleChange("dataFim", e.target.value)}
          />
        </div>
      )}

      <textarea
        className={styles.input}
        rows="2"
        placeholder="Outras condições (ex: Subsídio de Alimentação)"
        value={respostas.clausulasExtras}
        onChange={(e) => handleChange("clausulasExtras", e.target.value)}
        style={{ marginTop: 10 }}
      />
    </>
  );

  const renderFormVeiculo = () => (
    <>
      <h4>Vendedor</h4>
      <input
        className={styles.input}
        placeholder="Nome Vendedor"
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
          placeholder="CC/BI"
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

      <h4>Comprador</h4>
      <input
        className={styles.input}
        placeholder="Nome Comprador"
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
          placeholder="CC/BI"
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

      <h4>Veículo</h4>
      <div style={{ display: "flex", gap: 10 }}>
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
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="Matrícula"
          value={respostas.matricula}
          onChange={(e) => handleChange("matricula", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Chassis (VIN)"
          value={respostas.chassis}
          onChange={(e) => handleChange("chassis", e.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className={styles.input}
          placeholder="Quilómetros"
          value={respostas.km}
          onChange={(e) => handleChange("km", e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Preço Venda (€)"
          value={respostas.valor}
          onChange={(e) => handleChange("valor", e.target.value)}
        />
      </div>
    </>
  );

  const renderFormCartas = () => (
    <>
      <h4>Remetente (Quem envia)</h4>
      <input
        className={styles.input}
        placeholder="Seu Nome"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Sua Morada"
        value={respostas.clienteMorada}
        onChange={(e) => handleChange("clienteMorada", e.target.value)}
      />

      <h4>Destinatário</h4>
      <input
        className={styles.input}
        placeholder="Nome Destinatário/Empresa"
        value={respostas.empresa}
        onChange={(e) => handleChange("empresa", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Morada Destinatário"
        value={respostas.moradaEmpregador}
        onChange={(e) => handleChange("moradaEmpregador", e.target.value)}
      />

      <h4>Conteúdo</h4>
      <input
        className={styles.input}
        type="date"
        placeholder="Data Efeito"
        value={respostas.dataFim}
        onChange={(e) => handleChange("dataFim", e.target.value)}
      />
      <textarea
        className={styles.input}
        rows="4"
        placeholder="Motivo / Detalhes adicionais da carta"
        value={respostas.motivoTermo}
        onChange={(e) => handleChange("motivoTermo", e.target.value)}
        style={{ marginTop: 10 }}
      />
    </>
  );

  const renderFormGeral = () => (
    <>
      <h4>Partes Envolvidas</h4>
      <input
        className={styles.input}
        placeholder="Primeira Parte (Ex: Empresa/Credor)"
        value={respostas.parteReveladora} // Reutilizando campos genéricos
        onChange={(e) => handleChange("parteReveladora", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Segunda Parte (Ex: Funcionário/Devedor)"
        value={respostas.parteReceptora}
        onChange={(e) => handleChange("parteReceptora", e.target.value)}
      />

      <h4 style={{ marginTop: 15 }}>Dados Específicos</h4>
      <input
        className={styles.input}
        placeholder="Valor (se aplicável)"
        value={respostas.valor}
        onChange={(e) => handleChange("valor", e.target.value)}
      />
      <textarea
        className={styles.input}
        rows="3"
        placeholder="Objetivo / Descrição do Acordo"
        value={respostas.objetivo}
        onChange={(e) => handleChange("objetivo", e.target.value)}
        style={{ marginTop: 10 }}
      />

      {/* Campo específico para NDA */}
      {tipoDocAtual === "nda" && (
        <input
          className={styles.input}
          placeholder="Valor da Multa em caso de quebra"
          value={respostas.multa}
          onChange={(e) => handleChange("multa", e.target.value)}
          style={{ marginTop: 10 }}
        />
      )}
    </>
  );

  // ... (os outros renderForm permanecem exatamente iguais)

  const renderFormCPCV = () => (
    // ... (código existente mantido igual)
    <>
      <h4>Vendedor</h4>
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
      {/* ... (resto do código mantido igual) */}
    </>
  );

  // ... (mantenha todos os outros renderForm exatamente como estavam)

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

          {(tipoDocAtual === "trabalho" ||
            tipoDocAtual === "trabalho_efetivo") &&
            renderFormTrabalho(false)}

          {tipoDocAtual === "domestico" && renderFormTrabalho(true)}

          {(tipoDocAtual === "oposicao" ||
            tipoDocAtual === "rescisao_trabalho") &&
            renderFormCartas()}

          {(tipoDocAtual === "ata_assembleia" ||
            tipoDocAtual === "procuracao" ||
            tipoDocAtual === "rgpd" ||
            tipoDocAtual === "divida" ||
            tipoDocAtual === "nda" ||
            tipoDocAtual === "juridico") &&
            renderFormGeral()}

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
        {isMobile ? (
          <div className={styles.mobileWarning}>
            <span style={{ fontSize: "50px" }}>📱</span>
            <p>
              A pré-visualização em tempo real não está disponível em telemóveis
              para poupar bateria e dados.
            </p>
            <p
              style={{
                fontWeight: "bold",
                color: "#ff8c00",
                marginTop: "10px",
              }}
            >
              Clique em "Salvar e Gerar PDF" para baixar e ver o documento
              final.
            </p>
          </div>
        ) : (
          /* USANDO A "KEY" (pdfKey) PARA FORÇAR O RELOAD DO COMPONENTE */
          <>
            {contratoParaPDF ? (
              <PDFViewer
                key={pdfKey}
                style={{ width: "100%", height: "100%", border: "none" }}
                showToolbar={true}
              >
                <PDFFile
                  contrato={contratoParaPDF}
                  plano={planoDoUsuario}
                  logo={logoUsuario}
                />
              </PDFViewer>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                🔄 A carregar pré-visualização...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Editor;
