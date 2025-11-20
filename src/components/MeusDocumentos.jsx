import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Biblioteca.module.css";

function MeusDocumentos() {
  // Começamos com uma lista vazia
  const [documentos, setDocumentos] = useState([]);

  // O useEffect corre assim que a página é carregada
  useEffect(() => {
    // 1. Vai buscar o texto guardado no navegador
    const dadosSalvos = localStorage.getItem("meus_docs_db");

    // 2. Se existir, converte de volta para Lista. Se não, fica vazio.
    if (dadosSalvos) {
      setDocumentos(JSON.parse(dadosSalvos));
    }
  }, []); // Os [] vazios significam: "Executa isto apenas 1 vez, quando a página nascer"

  const apagarDocumento = (id) => {
    if (window.confirm("Tem a certeza que deseja apagar este documento?")) {
      // 1. Filtra a lista visualmente
      const novaLista = documentos.filter((doc) => doc.id !== id);
      setDocumentos(novaLista);

      // 2. ATUALIZA O BANCO DE DADOS DO NAVEGADOR
      localStorage.setItem("meus_docs_db", JSON.stringify(novaLista));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Meus Documentos</h2>
        <p>Gerencie os seus contratos e propostas criados.</p>
      </div>

      {documentos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h3>Ainda não tem documentos criados.</h3>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            Vá à biblioteca para começar um novo projeto.
          </p>
          <Link to="/dashboard/biblioteca" className={styles.botaoUsar}>
            Criar Novo Documento
          </Link>
        </div>
      ) : (
        <div className={styles.gridModelos}>
          {documentos.map((doc) => (
            <div key={doc.id} className={styles.cardModelo}>
              <div className={styles.previewDocumento}>
                <span style={{ fontSize: "40px" }}>📝</span>
              </div>

              <div className={styles.cardContent}>
                <h3>{doc.titulo}</h3>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  Modelo: {doc.modeloOriginal}
                </p>
                <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>
                  <span
                    style={{
                      background:
                        doc.status === "Finalizado" ? "#e6fffa" : "#fffaf0",
                      color:
                        doc.status === "Finalizado" ? "#047857" : "#9c4221",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {doc.status}
                  </span>
                  <span style={{ marginLeft: "10px", color: "#888" }}>
                    {doc.dataCriacao}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  className={styles.botaoUsar}
                  style={{ flex: 1 }}
                  onClick={() => alert("Em breve: Editor de Documentos!")}
                >
                  Editar
                </button>

                <button
                  onClick={() => apagarDocumento(doc.id)}
                  style={{
                    padding: "10px",
                    border: "1px solid #fee2e2",
                    background: "#fff",
                    color: "#ef4444",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MeusDocumentos;
