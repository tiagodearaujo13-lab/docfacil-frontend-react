import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../components/Biblioteca.module.css";

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documento, setDocumento] = useState(null);
  const [conteudo, setConteudo] = useState("");
  const [statusMsg, setStatusMsg] = useState(""); // Para mostrar "A salvar..."

  // 1. CARREGAR O DOCUMENTO DO SERVIDOR
  useEffect(() => {
    const carregarDocumento = async () => {
      const token = localStorage.getItem("token");
      try {
        const resposta = await fetch(`http://localhost:3000/documento/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resposta.ok) {
          const doc = await resposta.json();
          setDocumento(doc);
          // Se o documento já tiver conteúdo salvo, carrega. Se não, põe vazio.
          // Nota: O backend chama 'conteudo_json', o frontend chama 'conteudo' no state
          setConteudo(doc.conteudo_json || "Escreva o seu contrato aqui...");
        } else {
          alert("Documento não encontrado ou acesso negado.");
          navigate("/dashboard");
        }
      } catch (erro) {
        console.error("Erro ao carregar:", erro);
      }
    };
    carregarDocumento();
  }, [id, navigate]);

  // 2. SALVAR O DOCUMENTO NO SERVIDOR
  const salvarDocumento = async () => {
    setStatusMsg("A guardar...");
    const token = localStorage.getItem("token");

    try {
      const resposta = await fetch(`http://localhost:3000/documento/${id}`, {
        method: "PUT", // PUT é usado para atualizações
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ conteudo: conteudo }),
      });

      if (resposta.ok) {
        setStatusMsg("✅ Guardado com sucesso!");
        // Limpa a mensagem depois de 2 segundos
        setTimeout(() => setStatusMsg(""), 2000);
      } else {
        setStatusMsg("❌ Erro ao guardar.");
      }
    } catch (erro) {
      setStatusMsg("❌ Erro de conexão.");
    }
  };

  if (!documento)
    return <div style={{ padding: "50px" }}>A carregar o editor...</div>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Cabeçalho do Editor */}
      <div
        className={styles.header}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ⬅ Voltar
          </button>
          <h2 style={{ marginTop: "10px" }}>Editando: {documento.titulo}</h2>
        </div>

        <div>
          <span
            style={{ marginRight: "15px", color: "green", fontWeight: "bold" }}
          >
            {statusMsg}
          </span>
          <button className={styles.botaoUsar} onClick={salvarDocumento}>
            Salvar Alterações
          </button>
        </div>
      </div>

      {/* ÁREA DE EDIÇÃO */}
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <label
          style={{ display: "block", marginBottom: "10px", color: "#666" }}
        >
          Conteúdo do Contrato:
        </label>
        <textarea
          style={{
            width: "100%",
            height: "500px",
            padding: "20px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.5",
          }}
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Editor;
