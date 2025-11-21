import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MeusDocumentos.module.css"; // <--- MUDAR PARA O NOVO CSS

function MeusDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const buscarDocumentos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const resposta = await fetch("http://localhost:3000/meus-documentos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resposta.ok) {
        const lista = await resposta.json();
        // Ordenar por ID decrescente (o mais recente aparece primeiro)
        const listaOrdenada = lista.sort((a, b) => b.id - a.id);
        setDocumentos(listaOrdenada);
      } else {
        console.error("Erro ao buscar documentos");
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDocumentos();
  }, []);

  const apagarDocumento = async (id) => {
    if (window.confirm("Tem a certeza que deseja apagar este documento?")) {
      try {
        const token = localStorage.getItem("token");
        const resposta = await fetch(`http://localhost:3000/documento/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resposta.ok) {
          const novaLista = documentos.filter((doc) => doc.id !== id);
          setDocumentos(novaLista);
        } else {
          alert("Erro ao apagar.");
        }
      } catch (erro) {
        console.error(erro);
        alert("Erro de conexão.");
      }
    }
  };

  // Ícones baseados no tipo (Cosmética)
  const getIcone = (tipo) => {
    if (tipo?.includes("imobiliario") || tipo?.includes("cpcv")) return "🏠";
    if (tipo?.includes("trabalho")) return "👔";
    if (tipo?.includes("veiculo")) return "🚗";
    if (tipo?.includes("divida")) return "💰";
    return "📝";
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        {/* Cabeçalho */}
        <div className={styles.header}>
          <div>
            <h2>Os Meus Documentos</h2>
            <p>Gerencie, edite ou descarregue os seus contratos.</p>
          </div>

          {/* Botão Rápido para Criar Novo */}
          <Link to="/dashboard/biblioteca" className={styles.botaoNovo}>
            + Novo Documento
          </Link>
        </div>

        {carregando ? (
          <div className={styles.loadingArea}>
            <p>A carregar os seus documentos...</p>
          </div>
        ) : documentos.length === 0 ? (
          <div className={styles.emptyState}>
            <span style={{ fontSize: "50px" }}>📭</span>
            <h3>Ainda não tem documentos salvos.</h3>
            <p>Comece agora a criar o seu primeiro contrato.</p>
            <Link to="/dashboard/biblioteca" className={styles.botaoCta}>
              Ir para a Biblioteca
            </Link>
          </div>
        ) : (
          <div className={styles.gridDocs}>
            {documentos.map((doc) => (
              <div key={doc.id} className={styles.docCard}>
                {/* Área do Ícone */}
                <div className={styles.cardIconArea}>
                  <span>{getIcone(doc.tipo_documento)}</span>
                </div>

                {/* Conteúdo */}
                <div className={styles.cardContent}>
                  <h3>{doc.titulo}</h3>
                  <div className={styles.metaInfo}>
                    <span className={styles.tagTipo}>
                      {doc.tipo_documento || "Geral"}
                    </span>
                    <span className={styles.dataCriacao}>
                      {/* Se tiver data no futuro, use: new Date(doc.created_at).toLocaleDateString() */}
                      ID: #{doc.id}
                    </span>
                  </div>
                </div>

                {/* Ações (Botões) */}
                <div className={styles.cardActions}>
                  <button
                    className={styles.btnEditar}
                    onClick={() => navigate(`/dashboard/editor/${doc.id}`)}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className={styles.btnApagar}
                    onClick={() => apagarDocumento(doc.id)}
                    title="Apagar Documento"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MeusDocumentos;
