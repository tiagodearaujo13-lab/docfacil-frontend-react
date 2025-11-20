import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Biblioteca.module.css"; // Vamos reaproveitar o estilo da Biblioteca por enquanto!

function MeusDocumentos() {
  // Simulação de documentos que o utilizador já criou
  // O 'useState' vai permitir-nos apagar documentos da lista visualmente depois
  const [documentos, setDocumentos] = useState([
    {
      id: 101,
      titulo: "Contrato João da Silva",
      modeloOriginal: "Contrato de Prestação de Serviços",
      dataCriacao: "20/11/2023",
      status: "Rascunho",
    },
    {
      id: 102,
      titulo: "Orçamento Obras Cozinha",
      modeloOriginal: "Orçamento de Obras",
      dataCriacao: "18/11/2023",
      status: "Finalizado",
    },
  ]);

  const apagarDocumento = (id) => {
    if (window.confirm("Tem a certeza que deseja apagar este documento?")) {
      // Filtra a lista mantendo apenas os documentos que NÃO têm esse id
      const novaLista = documentos.filter((doc) => doc.id !== id);
      setDocumentos(novaLista);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Meus Documentos</h2>
        <p>Gerencie os seus contratos e propostas criados.</p>
      </div>

      {/* Se não houver documentos, mostra um aviso amigável */}
      {documentos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Ainda não tem documentos criados.</p>
          <Link to="/dashboard/biblioteca" className={styles.botaoUsar}>
            Criar Novo Documento
          </Link>
        </div>
      ) : (
        <div className={styles.gridModelos}>
          {documentos.map((doc) => (
            <div key={doc.id} className={styles.cardModelo}>
              <div className={styles.previewDocumento}>
                {/* Ícone diferente para diferenciar de modelos virgens */}
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
                  onClick={() => alert("Vai abrir o editor para editar!")}
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
