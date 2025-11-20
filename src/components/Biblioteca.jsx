import { useNavigate } from "react-router-dom";
import styles from "./Biblioteca.module.css";

function Biblioteca() {
  const navigate = useNavigate();

  // Lista de Modelos (A nossa "Loja")
  const modelos = [
    {
      id: 1,
      titulo: "Contrato de Prestação de Serviços",
      descricao: "Ideal para freelancers e agências. Proteja o seu trabalho.",
      tipo: "contrato",
    },
    {
      id: 2,
      titulo: "Contrato de Arrendamento",
      descricao: "Modelo atualizado com a lei portuguesa.",
      tipo: "imobiliario",
    },
    {
      id: 3,
      titulo: "Acordo de Confidencialidade (NDA)",
      descricao: "Proteja as suas ideias e segredos comerciais.",
      tipo: "juridico",
    },
    {
      id: 4,
      titulo: "Proposta Comercial Simples",
      descricao: "Apresente os seus serviços de forma limpa e direta.",
      tipo: "proposta",
    },
    {
      id: 5,
      titulo: "Orçamento de Obras",
      descricao: "Discriminativo de materiais e mão de obra.",
      tipo: "orcamento",
    },
  ];

  // --- A MÁGICA ACONTECE AQUI ---
  const criarDocumento = (modelo) => {
    // 1. Criar o objeto do novo documento
    const novoDoc = {
      id: Date.now(), // Gera um ID único baseado na hora atual (ex: 17005839202)
      titulo: modelo.titulo, // Copia o nome do modelo
      modeloOriginal: modelo.titulo,
      dataCriacao: new Date().toLocaleDateString("pt-PT"), // Data de hoje
      status: "Rascunho",
    };

    // 2. Buscar o que já existe na memória do navegador ("banco de dados")
    const dadosSalvos = localStorage.getItem("meus_docs_db");

    // Se existir algo, converte de Texto para Array. Se não, cria um Array vazio.
    const listaAtual = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    // 3. Adicionar o novo documento à lista
    listaAtual.push(novoDoc);

    // 4. Salvar a lista atualizada de volta no navegador
    // O localStorage só aceita Texto (String), por isso usamos JSON.stringify
    localStorage.setItem("meus_docs_db", JSON.stringify(listaAtual));

    // 5. Redirecionar o utilizador para a lista de documentos
    alert("Documento criado com sucesso!"); // Um feedback rápido
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Biblioteca de Documentos</h2>
        <p>Escolha um modelo profissional para começar a editar.</p>
      </div>

      <div className={styles.gridModelos}>
        {modelos.map((modelo) => (
          <div key={modelo.id} className={styles.cardModelo}>
            <div className={styles.previewDocumento}>
              <span style={{ fontSize: "40px" }}>📄</span>
            </div>
            <div className={styles.cardContent}>
              <h3>{modelo.titulo}</h3>
              <p>{modelo.descricao}</p>
            </div>
            <button
              className={styles.botaoUsar}
              // Agora chamamos a função real passando o modelo inteiro
              onClick={() => criarDocumento(modelo)}
            >
              Usar este Modelo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Biblioteca;
