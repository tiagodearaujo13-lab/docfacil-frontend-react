import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../components/Biblioteca.module.css"; // Vamos usar o mesmo estilo por enquanto

function Editor() {
  const { id } = useParams(); // Captura o ID que está na URL (ex: 170058...)
  const navigate = useNavigate();
  const [documento, setDocumento] = useState(null);
  const [conteudo, setConteudo] = useState(""); // Aqui ficará o texto do contrato

  useEffect(() => {
    // 1. Buscar todos os documentos
    const dadosSalvos = localStorage.getItem("meus_docs_db");
    if (dadosSalvos) {
      const lista = JSON.parse(dadosSalvos);

      // 2. Encontrar O documento específico pelo ID
      // Nota: O ID da URL vem como Texto (String), por isso convertemos para comparar
      const docEncontrado = lista.find((doc) => doc.id.toString() === id);

      if (docEncontrado) {
        setDocumento(docEncontrado);
        // Se o documento já tivesse conteúdo salvo, carregaríamos aqui.
        // Por enquanto, vamos colocar um texto padrão.
        setConteudo(
          `Texto inicial do modelo: ${docEncontrado.modeloOriginal}...`
        );
      } else {
        alert("Documento não encontrado!");
        navigate("/dashboard");
      }
    }
  }, [id, navigate]);

  if (!documento) return <p>A carregar...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div className={styles.header}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ marginBottom: "10px", cursor: "pointer" }}
        >
          ⬅ Voltar
        </button>
        <h2>Editando: {documento.titulo}</h2>
        <p>Status: {documento.status}</p>
      </div>

      {/* ÁREA DE EDIÇÃO (Simples textarea por enquanto) */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <textarea
          style={{
            width: "100%",
            height: "400px",
            padding: "15px",
            fontSize: "16px",
            border: "1px solid #ddd",
          }}
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            className={styles.botaoUsar}
            onClick={() => alert("Vamos salvar isto na próxima aula!")}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
