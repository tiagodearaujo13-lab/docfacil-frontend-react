import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gerarTextoContrato } from "../modelos/ContratoServicos.js";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFFile from "../components/PDFFile.jsx";
import styles from "../components/Biblioteca.module.css";

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("");

  // 1. NOVO: Estado para guardar o Logótipo
  const [logoUsuario, setLogoUsuario] = useState(null);

  const [respostas, setRespostas] = useState({
    prestador: "",
    cliente: "",
    descricaoServico: "",
    valor: "",
    prazo: "",
    comarca: "Lisboa",
    temConfidencialidade: false,
    temExclusividade: false,
  });

  // 2. Define como "pro" para testares o botão de logo agora!
  const planoDoUsuario = "pro";

  const contratoGerado = gerarTextoContrato(respostas);

  const handleChange = (campo, valor) => {
    setRespostas((prev) => ({ ...prev, [campo]: valor }));
  };

  // 3. NOVO: Função para ler a imagem do computador
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUsuario(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvarEBaixar = async () => {
    setStatusMsg("⏳ A processar...");

    // PASSO A: Salvar no Banco de Dados
    try {
      const token = localStorage.getItem("token");
      const respostaBackend = await fetch(
        `http://localhost:3000/documento/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ conteudo: JSON.stringify(respostas) }),
        }
      );

      if (!respostaBackend.ok) throw new Error("Erro ao salvar no banco");
    } catch (erro) {
      console.error(erro);
      setStatusMsg("⚠️ Salvo apenas localmente (Erro no servidor).");
    }

    // PASSO B: Gerar e Baixar o PDF
    try {
      setStatusMsg("📄 A gerar PDF...");

      // 4. ATUALIZADO: Passamos o 'logo={logoUsuario}' para o PDF
      const blob = await pdf(
        <PDFFile
          contrato={contratoGerado}
          plano={planoDoUsuario}
          logo={logoUsuario}
        />
      ).toBlob();

      saveAs(blob, `${contratoGerado.titulo}.pdf`);

      setStatusMsg("✅ Sucesso! Download iniciado.");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (erro) {
      console.error(erro);
      setStatusMsg("❌ Erro ao gerar PDF.");
    }
  };

  return (
    <div className={styles.editorContainer}>
      {/* --- LADO ESQUERDO: O FORMULÁRIO --- */}
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
              textAlign: "left",
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

        <h2>Preencha os Dados</h2>
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "20px" }}>
          Preencha os campos para gerar o contrato automaticamente.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            flex: 1,
          }}
        >
          <div>
            <label className={styles.label}>Prestador de Serviços (Você)</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nome completo ou Empresa"
              value={respostas.prestador}
              onChange={(e) => handleChange("prestador", e.target.value)}
            />
          </div>

          <div>
            <label className={styles.label}>Cliente</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nome do Cliente"
              value={respostas.cliente}
              onChange={(e) => handleChange("cliente", e.target.value)}
            />
          </div>

          <div>
            <label className={styles.label}>Descrição do Serviço</label>
            <textarea
              className={styles.input}
              rows="3"
              placeholder="Ex: Desenvolvimento de Website..."
              value={respostas.descricaoServico}
              onChange={(e) => handleChange("descricaoServico", e.target.value)}
            />
          </div>

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
              <label className={styles.label}>Data de Fim</label>
              <input
                className={styles.input}
                type="date"
                value={respostas.prazo}
                onChange={(e) => handleChange("prazo", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={styles.label}>Comarca (Tribunal)</label>
            <select
              className={styles.input}
              value={respostas.comarca}
              onChange={(e) => handleChange("comarca", e.target.value)}
            >
              <option value="Lisboa">Lisboa</option>
              <option value="Porto">Porto</option>
              <option value="Faro">Faro</option>
              <option value="Coimbra">Coimbra</option>
            </select>
          </div>

          {/* --- ÁREA DE OPÇÕES PRO --- */}
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
              style={{
                margin: "0 0 10px 0",
                color: "#9c4221",
                fontSize: "0.9rem",
              }}
            >
              Cláusulas Opcionais (Pro)
            </h4>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                id="confidencialidade"
                checked={respostas.temConfidencialidade}
                onChange={(e) =>
                  handleChange("temConfidencialidade", e.target.checked)
                }
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  accentColor: "#ff8c00",
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor="confidencialidade"
                style={{ fontSize: "0.9rem", cursor: "pointer", color: "#333" }}
              >
                Adicionar Dever de Sigilo
              </label>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="exclusividade"
                checked={respostas.temExclusividade}
                onChange={(e) =>
                  handleChange("temExclusividade", e.target.checked)
                }
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  accentColor: "#ff8c00",
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor="exclusividade"
                style={{ fontSize: "0.9rem", cursor: "pointer", color: "#333" }}
              >
                Adicionar Exclusividade
              </label>
            </div>

            {/* 5. NOVO: ÁREA DE UPLOAD DE LOGO (SÓ APARECE SE FOR PRO) */}
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
                  O seu Logótipo (Canto Superior Direito)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ fontSize: "0.8rem" }}
                />
                {logoUsuario && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "green",
                      marginTop: "5px",
                    }}
                  >
                    Logo carregado com sucesso! ✅
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          className={styles.botaoUsar}
          style={{ marginTop: "30px", width: "100%" }}
          onClick={handleSalvarEBaixar}
        >
          💾 Salvar e Gerar PDF
        </button>
      </div>

      {/* --- LADO DIREITO: A PRÉ-VISUALIZAÇÃO --- */}
      <div className={styles.previewArea}>
        <div className={styles.folhaA4}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "1.4em",
              marginBottom: "30px",
              textTransform: "uppercase",
            }}
          >
            {contratoGerado.titulo}
          </h1>

          {contratoGerado.clausulas.map((clausula, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
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
              O Prestador
            </div>
            <div
              style={{
                borderTop: "1px solid #000",
                width: "45%",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              O Cliente
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
