import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Biblioteca.module.css";

function Biblioteca() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  const modelos = [
    // ======================================
    // --- IMOBILIÁRIO ---
    // ======================================
    {
      id: 2,
      titulo: "Contrato de Arrendamento",
      descricao: "Habitação permanente. Atualizado com a lei do NRAU.",
      tipo: "imobiliario",
      categoria: "imobiliario",
      popular: true,
    },
    {
      id: 10,
      titulo: "CPCV - Contrato Promessa",
      descricao: "Sinais, prazos e cláusulas de incumprimento para imóveis.",
      tipo: "cpcv",
      categoria: "imobiliario",
      popular: true,
    },
    {
      id: 12, // NOVO
      titulo: "Carta Oposição à Renovação",
      descricao: "Para Senhorios ou Inquilinos terminarem o contrato no prazo.",
      tipo: "oposicao",
      categoria: "imobiliario",
    },

    // ======================================
    // --- RECURSOS HUMANOS (RH) ---
    // ======================================
    {
      id: 11,
      titulo: "Contrato de Trabalho (Efetivo)",
      descricao: "Por tempo indeterminado. Sem termo.",
      tipo: "trabalho_efetivo",
      categoria: "rh",
      popular: true,
    },
    {
      id: 6,
      titulo: "Contrato de Trabalho (Termo Certo)",
      descricao: "Para substituições ou necessidades temporárias.",
      tipo: "trabalho",
      categoria: "rh",
    },
    {
      id: 13, // NOVO
      titulo: "Contrato Serviço Doméstico",
      descricao: "Para empregadas de limpeza, cuidadores ou governantas.",
      tipo: "domestico",
      categoria: "rh",
    },
    {
      id: 14, // NOVO
      titulo: "Carta de Demissão (Rescisão)",
      descricao: "Para o trabalhador se despedir cumprindo o aviso prévio.",
      tipo: "rescisao_trabalho",
      categoria: "rh",
    },

    // ======================================
    // --- COMERCIAL / VENDAS ---
    // ======================================
    {
      id: 1,
      titulo: "Contrato Prestação de Serviços",
      descricao: "Ideal para freelancers, consultores e agências.",
      tipo: "contrato",
      categoria: "comercial",
      popular: true,
    },
    {
      id: 4,
      titulo: "Proposta Comercial",
      descricao: "Apresente os seus serviços e feche mais negócios.",
      tipo: "proposta",
      categoria: "comercial",
    },
    {
      id: 5,
      titulo: "Orçamento de Obras",
      descricao: "Discriminativo de materiais e mão de obra.",
      tipo: "orcamento",
      categoria: "comercial",
    },

    // ======================================
    // --- JURÍDICO / GERAL ---
    // ======================================
    {
      id: 9,
      titulo: "Compra e Venda de Veículo",
      descricao: "Transferência de propriedade automóvel (segurança).",
      tipo: "veiculo",
      categoria: "juridico",
      popular: true,
    },
    {
      id: 15, // NOVO
      titulo: "Ata de Assembleia Geral",
      descricao: "Aprovação de contas anual e distribuição de lucros.",
      tipo: "ata_assembleia",
      categoria: "juridico",
    },
    {
      id: 16, // NOVO
      titulo: "Procuração Profissional",
      descricao: "Confira poderes a advogados ou terceiros para o representar.",
      tipo: "procuracao",
      categoria: "juridico",
    },
    {
      id: 3,
      titulo: "Acordo de Confidencialidade (NDA)",
      descricao: "Proteja as suas ideias e segredos de negócio.",
      tipo: "juridico",
      categoria: "juridico",
    },
    {
      id: 7,
      titulo: "Política de Privacidade (RGPD)",
      descricao: "Obrigatório para sites e empresas na UE.",
      tipo: "rgpd",
      categoria: "juridico",
    },
    {
      id: 8,
      titulo: "Reconhecimento de Dívida",
      descricao: "Segurança jurídica para empréstimos entre particulares.",
      tipo: "divida",
      categoria: "juridico",
    },
  ];

  // Lógica de Filtragem
  const modelosFiltrados = modelos.filter((modelo) => {
    const correspondeCategoria =
      filtro === "todos" ? true : modelo.categoria === filtro;
    const correspondeBusca = modelo.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());
    return correspondeCategoria && correspondeBusca;
  });

  const criarDocumento = async (modelo) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Para criar documentos, por favor faça login.");
        return;
      }

      const resposta = await fetch("http://localhost:3000/criar-documento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: modelo.titulo,
          tipo_documento: modelo.tipo,
        }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        navigate(`/dashboard/editor/${dados.id}`);
      } else {
        alert("Erro ao conectar com o servidor.");
      }
    } catch (erro) {
      console.error(erro);
      alert("Erro de conexão. Verifique se o backend está a rodar.");
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        {/* Cabeçalho */}
        <div className={styles.header}>
          <div>
            <h2>Biblioteca de Modelos</h2>
            <p>Documentos juridicamente validados para o seu negócio.</p>
          </div>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="🔍 Procurar modelo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {/* Filtros */}
        <div className={styles.filtros}>
          <button
            className={filtro === "todos" ? styles.ativo : ""}
            onClick={() => setFiltro("todos")}
          >
            Todos
          </button>
          <button
            className={filtro === "imobiliario" ? styles.ativo : ""}
            onClick={() => setFiltro("imobiliario")}
          >
            🏠 Imobiliário
          </button>
          <button
            className={filtro === "rh" ? styles.ativo : ""}
            onClick={() => setFiltro("rh")}
          >
            👔 Recursos Humanos
          </button>
          <button
            className={filtro === "comercial" ? styles.ativo : ""}
            onClick={() => setFiltro("comercial")}
          >
            💼 Comercial
          </button>
          <button
            className={filtro === "juridico" ? styles.ativo : ""}
            onClick={() => setFiltro("juridico")}
          >
            ⚖️ Jurídico
          </button>
        </div>

        {/* Grid */}
        <div className={styles.gridModelos}>
          {modelosFiltrados.length > 0 ? (
            modelosFiltrados.map((modelo) => (
              <div key={modelo.id} className={styles.cardModelo}>
                {modelo.popular && (
                  <span className={styles.badgePopular}>🔥 Popular</span>
                )}

                <div className={styles.cardIcon}>
                  {modelo.categoria === "imobiliario" && "🏠"}
                  {modelo.categoria === "rh" && "👔"}
                  {modelo.categoria === "comercial" && "💼"}
                  {modelo.categoria === "juridico" && "⚖️"}
                </div>

                <div className={styles.cardContent}>
                  <h3>{modelo.titulo}</h3>
                  <p>{modelo.descricao}</p>
                </div>

                <button
                  className={styles.botaoUsar}
                  onClick={() => criarDocumento(modelo)}
                >
                  Criar Documento
                </button>
              </div>
            ))
          ) : (
            <div className={styles.semResultados}>
              <p>Nenhum modelo encontrado para essa pesquisa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Biblioteca;
