import { useNavigate } from "react-router-dom";
import styles from "./Biblioteca.module.css";

function Biblioteca() {
  const navigate = useNavigate();

  const modelos = [
    {
      id: 1,
      titulo: "Contrato de Prestação de Serviços",
      descricao: "Ideal para freelancers e agências.",
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
      descricao: "Proteja as suas ideias.",
      tipo: "juridico",
    },
    {
      id: 4,
      titulo: "Proposta Comercial Simples",
      descricao: "Apresente os seus serviços.",
      tipo: "proposta",
    },
    {
      id: 5,
      titulo: "Orçamento de Obras",
      descricao: "Discriminativo de materiais e mão de obra.",
      tipo: "orcamento",
    },
  ];

  // --- FUNÇÃO ATUALIZADA: AGORA FALA COM O SERVIDOR ---
  const criarDocumento = async (modelo) => {
    try {
      // 1. Buscar o Token (o crachá de acesso)
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        navigate("/login");
        return;
      }

      console.log("A criar documento no servidor...");

      // 2. Enviar pedido ao Backend
      const resposta = await fetch("http://localhost:3000/criar-documento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Aqui vai o crachá!
        },
        body: JSON.stringify({
          titulo: modelo.titulo,
          tipo_documento: modelo.tipo,
        }),
      });

      // 3. Verificar se correu bem
      if (resposta.ok) {
        const dados = await resposta.json(); // O servidor devolve o ID novo (ex: 1, 2, 3...)
        console.log("Sucesso! ID criado:", dados.id);

        // 4. Redirecionar para o Editor com o ID REAL do banco de dados
        navigate(`/dashboard/editor/${dados.id}`);
      } else {
        alert("Erro ao criar documento. O servidor reclamou.");
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
      alert("Não foi possível conectar ao servidor. Ele está ligado?");
    }
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
