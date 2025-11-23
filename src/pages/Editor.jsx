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

  // Estado Gigante para cobrir todos os modelos
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
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = localStorage.getItem("token");

        const respostaDoc = await fetch(
          `https://meu-backend-api-rohr.onrender.com/documento/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const respostaPerfil = await fetch(
          `https://meu-backend-api-rohr.onrender.com/perfil`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
      await fetch(`https://meu-backend-api-rohr.onrender.com/documento/${id}`, {
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

  // --- RENDERIZADORES DE FORMULÁRIOS ---

  const renderFormServicos = () => (
    <>
      <h4>Prestador</h4>
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
      <h4>Cliente</h4>
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
      <h4>Detalhes</h4>
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
      <input
        className={styles.input}
        type="date"
        value={respostas.dataInicio}
        onChange={(e) => handleChange("dataInicio", e.target.value)}
      />
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
        placeholder="Nome"
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
      </div>
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.moradaEmpregador}
        onChange={(e) => handleChange("moradaEmpregador", e.target.value)}
      />
      <h4>Trabalhador</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.trabalhador}
        onChange={(e) => handleChange("trabalhador", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
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
        placeholder="IBAN"
        value={respostas.ibanTrabalhador}
        onChange={(e) => handleChange("ibanTrabalhador", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Morada"
        value={respostas.moradaTrabalhador}
        onChange={(e) => handleChange("moradaTrabalhador", e.target.value)}
      />
      <h4>Condições</h4>
      <input
        className={styles.input}
        placeholder={isDomestico ? "Tarefas" : "Função"}
        value={isDomestico ? respostas.descricaoServico : respostas.funcao}
        onChange={(e) =>
          handleChange(
            isDomestico ? "descricaoServico" : "funcao",
            e.target.value
          )
        }
      />
      <input
        className={styles.input}
        placeholder="Local de Trabalho"
        value={respostas.moradaImovel}
        onChange={(e) => handleChange("moradaImovel", e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          className={styles.input}
          type="number"
          placeholder="Salário"
          value={respostas.salario}
          onChange={(e) => handleChange("salario", e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          value={respostas.dataInicio}
          onChange={(e) => handleChange("dataInicio", e.target.value)}
        />
      </div>
      {tipoDocAtual === "trabalho" && (
        <>
          <input
            className={styles.input}
            type="date"
            value={respostas.dataFim}
            onChange={(e) => handleChange("dataFim", e.target.value)}
          />
          <textarea
            className={styles.input}
            rows="2"
            placeholder="Motivo do Termo"
            value={respostas.motivoTermo}
            onChange={(e) => handleChange("motivoTermo", e.target.value)}
          />
        </>
      )}
      <div style={{ marginTop: 10 }}>
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

  const renderFormCPCV = () => (
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
      <h4>Comprador</h4>
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
      <h4>Dados</h4>
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
      <input
        className={styles.input}
        type="number"
        placeholder="Prazo (Dias)"
        value={respostas.prazo}
        onChange={(e) => handleChange("prazo", e.target.value)}
      />
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

  const renderFormVeiculo = () => (
    <>
      <h4>Veículo</h4>
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
      <input
        className={styles.input}
        placeholder="KM"
        value={respostas.km}
        onChange={(e) => handleChange("km", e.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Valor €"
        value={respostas.valor}
        onChange={(e) => handleChange("valor", e.target.value)}
      />
      <h4>Vendedor</h4>
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
      <h4>Comprador</h4>
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

  const renderFormCartas = () => (
    <>
      {tipoDocAtual === "oposicao" && (
        <select
          className={styles.input}
          value={respostas.role}
          onChange={(e) => handleChange("role", e.target.value)}
          style={{ marginBottom: 15 }}
        >
          <option value="senhorio">Sou o Senhorio</option>
          <option value="inquilino">Sou o Inquilino</option>
        </select>
      )}
      <h4>Remetente</h4>
      <input
        className={styles.input}
        placeholder="Nome"
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
      <input
        className={styles.input}
        placeholder="Morada"
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
      <h4>Destinatário</h4>
      <input
        className={styles.input}
        placeholder="Nome"
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
      <input
        className={styles.input}
        placeholder="Morada"
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
      <h4>Dados</h4>
      <input
        className={styles.input}
        placeholder={
          tipoDocAtual === "oposicao"
            ? "Morada do Imóvel"
            : "Data Fim do Contrato"
        }
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
      <input
        className={styles.input}
        placeholder={
          tipoDocAtual === "oposicao"
            ? "Data Fim do Contrato"
            : "Dias Aviso Prévio"
        }
        value={respostas.prazo}
        onChange={(e) => handleChange("prazo", e.target.value)}
      />
    </>
  );

  const renderFormGeral = () => (
    <>
      <h4>Dados</h4>
      <input
        className={styles.input}
        placeholder="Nome"
        value={respostas.empresa}
        onChange={(e) => handleChange("empresa", e.target.value)}
      />
      <textarea
        className={styles.input}
        rows="4"
        placeholder="Descrição / Conteúdo"
        value={respostas.descricaoServico}
        onChange={(e) => handleChange("descricaoServico", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Nome 2 / Presidente"
        value={respostas.prestador}
        onChange={(e) => handleChange("prestador", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Nome 3 / Secretário"
        value={respostas.cliente}
        onChange={(e) => handleChange("cliente", e.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Valor / Capital"
        value={respostas.valor}
        onChange={(e) => handleChange("valor", e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Data / Hora"
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

          <label className={styles.label}>Comarca / Local</label>
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
