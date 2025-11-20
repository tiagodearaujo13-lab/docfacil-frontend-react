import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Biblioteca.module.css";

function MeusDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true); // Para mostrar "A carregar..."
  const navigate = useNavigate();

  // Função para buscar dados do Servidor
  const buscarDocumentos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // Se não tiver token, não busca nada

      const resposta = await fetch("http://localhost:3000/meus-documentos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resposta.ok) {
        const lista = await resposta.json();
        setDocumentos(lista); // Guarda a lista que veio do SQLite!
      } else {
        console.error("Erro ao buscar documentos");
      }
    } catch (erro) {
      console.error("O servidor está desligado?", erro);
    } finally {
      setCarregando(false);
    }
  };

  // O useEffect chama a função assim que a página abre
  useEffect(() => {
    buscarDocumentos();
  }, []);

  // Função apagar
  const apagarDocumento = async (id) => {
    if (window.confirm("Tem a certeza? Esta ação não pode ser desfeita.")) {
      try {
        const token = localStorage.getItem("token");

        // 1. Enviar ordem para o servidor destruir o ficheiro
        const resposta = await fetch(`http://localhost:3000/documento/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (resposta.ok) {
          // 2. Se o servidor confirmou, atualizamos a lista visualmente
          // (Removemos o item da lista sem precisar recarregar a página)
          const novaLista = documentos.filter((doc) => doc.id !== id);
          setDocumentos(novaLista);
          alert("Documento apagado!");
        } else {
          alert("Erro ao apagar. Tente novamente.");
        }
      } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro de conexão.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Meus Documentos</h2>
        <p>Gerencie os seus contratos e propostas criados.</p>
      </div>

      {carregando ? (
        <p style={{ textAlign: "center" }}>A conectar ao servidor...</p>
      ) : documentos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h3>Ainda não tem documentos na nuvem.</h3>
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
                  {/* O banco de dados chama 'tipo_documento', o front chamava 'modeloOriginal' */}
                  Tipo: {doc.tipo_documento || "Documento"}
                </p>
                <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>
                  {/* Status fixo por enquanto, pois não temos status no banco ainda */}
                  <span
                    style={{
                      background: "#fffaf0",
                      color: "#9c4221",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Rascunho
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  className={styles.botaoUsar}
                  style={{ flex: 1 }}
                  // Agora usamos o ID real do banco de dados!
                  onClick={() => navigate(`/dashboard/editor/${doc.id}`)}
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
