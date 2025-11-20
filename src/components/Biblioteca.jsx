import { useNavigate } from "react-router-dom";
import styles from "./Biblioteca.module.css";

function Biblioteca() {
  const navigate = useNavigate();

  // Lista de Modelos Disponíveis
  const modelos = [
    {
      id: 1,
      titulo: "Contrato de Prestação de Serviços",
      descricao:
        "Ideal para freelancers e agências. Proteja o seu trabalho com cláusulas de pagamento e prazos.",
      tipo: "contrato",
    },
    {
      id: 2,
      titulo: "Contrato de Arrendamento",
      descricao:
        "Modelo atualizado com a lei portuguesa. Inclui opção para fiador e cláusulas de rescisão.",
      tipo: "imobiliario",
    },
    {
      id: 3,
      titulo: "Acordo de Confidencialidade (NDA)",
      descricao:
        "Proteja as suas ideias e segredos comerciais antes de partilhar informações com terceiros.",
      tipo: "juridico",
    },
    {
      id: 4,
      titulo: "Proposta Comercial Simples",
      descricao:
        "Apresente os seus serviços de forma limpa, direta e vencedora. Design minimalista.",
      tipo: "proposta",
    },
    {
      id: 5,
      titulo: "Orçamento de Obras",
      descricao:
        "Discriminativo de materiais e mão de obra para construção civil e remodelações.",
      tipo: "orcamento",
    },
  ];

  const escolherModelo = (modeloId) => {
    console.log("Escolheu o modelo:", modeloId);
    // Na próxima aula, vamos criar a rota '/dashboard/editor/:id'
    // Por agora, mostramos um alerta.
    alert("Na próxima aula, isto abre o Editor para o modelo " + modeloId);
    // navigate(`/dashboard/editor/${modeloId}`);
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
              {/* Ícone representando uma folha */}
              <span style={{ fontSize: "40px" }}>📄</span>
            </div>
            <div className={styles.cardContent}>
              <h3>{modelo.titulo}</h3>
              <p>{modelo.descricao}</p>
            </div>
            <button
              className={styles.botaoUsar}
              onClick={() => escolherModelo(modelo.id)}
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
