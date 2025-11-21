import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MeusDocumentos.module.css";

function MeusDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estado para saber qual documento está a ser apagado (para mostrar confirmação no botão)
  const [idParaApagar, setIdParaApagar] = useState(null);

  const navigate = useNavigate();

  const buscarDocumentos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const resposta = await fetch("http://localhost:3000/meus-documentos", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resposta.ok) {
        const lista = await resposta.json();
        const listaOrdenada = lista.sort((a, b) => b.id - a.id);
        setDocumentos(listaOrdenada);
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

  const tentarApagar = (id) => {
    if (idParaApagar === id) {
      // Se clicou a segunda vez, apaga mesmo!
      apagarDefinitivo(id);
    } else {
      // Se clicou a primeira vez, pede confirmação
      setIdParaApagar(id);
      // Cancela a confirmação se não clicar em 3 segundos
      setTimeout(() => setIdParaApagar(null), 3000);
    }
  };

  const apagarDefinitivo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch(`http://localhost:3000/documento/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resposta.ok) {
        const novaLista = documentos.filter((doc) => doc.id !== id);
        setDocumentos(novaLista);
        setIdParaApagar(null);
      } else {
        console.error("Erro ao apagar.");
      }
    } catch (erro) {
      console.error(erro);
    }
  };

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
        <div className={styles.header}>
          <div>
            <h2>Os Meus Documentos</h2>
            <p>Gerencie, edite ou descarregue os seus contratos.</p>
          </div>
          <Link to="/dashboard/biblioteca" className={styles.botaoNovo}>
            + Novo Documento
          </Link>
        </div>

        {carregando ? (
          <div className={styles.loadingArea}>
            <p>A carregar...</p>
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
                <div className={styles.cardIconArea}>
                  <span>{getIcone(doc.tipo_documento)}</span>
                </div>

                <div className={styles.cardContent}>
                  <h3>{doc.titulo}</h3>
                  <div className={styles.metaInfo}>
                    <span className={styles.tagTipo}>
                      {doc.tipo_documento || "Geral"}
                    </span>
                    <span className={styles.dataCriacao}>ID: #{doc.id}</span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.btnEditar}
                    onClick={() => navigate(`/dashboard/editor/${doc.id}`)}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className={styles.btnApagar}
                    onClick={() => tentarApagar(doc.id)}
                    style={{
                      color: idParaApagar === doc.id ? "red" : "",
                      fontWeight: idParaApagar === doc.id ? "bold" : "normal",
                      fontSize: idParaApagar === doc.id ? "0.8rem" : "1.2rem",
                      width: idParaApagar === doc.id ? "auto" : "60px",
                      padding: idParaApagar === doc.id ? "0 10px" : "",
                    }}
                  >
                    {idParaApagar === doc.id ? "Confirmar?" : "🗑️"}
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
