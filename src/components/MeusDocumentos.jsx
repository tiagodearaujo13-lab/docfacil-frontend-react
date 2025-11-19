import styles from "./MeusDocumentos.module.css";

// Sub-peça para cada cartão de documento
function DocumentoCard(props) {
  return (
    <div className={styles.docCard}>
      <div className={styles.cardImagen}>
        {/* Aqui onde vai as imagens dos documentos*/}
      </div>
      <h4>{props.titulo}</h4>
      <p>{props.detalhes}</p>
    </div>
  );
}

// A Peça principal que vamos exportar
function MeusDocumentos() {
  return (
    <div className={styles.mainContainer}>
      {/* O Topo (Header) da sala da direita*/}
      <div className={styles.mainHeader}>
        <div>
          <h2>Meus Documentos</h2>
          <p>Todos os seus documentos criados e guardados.</p>
        </div>
        <button className={styles.botaoNovoDoc}>+ Novo Documento</button>
      </div>

      {/* A Barra de Filtros */}
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar nos seus documentos..."
          className={styles.barraPesquisa}
        />
        {/* Vou adicionar os selects de filtro depois */}
      </div>

      {/* O Grid de cartões de documentos */}
      <div className={styles.gridDocs}>
        {/* "Chamamos" os nossos cartões (por agora, "falsos") */}
        <DocumentoCard
          titulo="Contrato de Arrendamento"
          detalhes="Modificado há 2 dias"
        />
        <DocumentoCard
          titulo="Prospota de Desig"
          detalhes="Modificado há 5 dias"
        />
        <DocumentoCard
          titulo="Acordo de Confidencialidade"
          detalhes="Modificado há 7 dias"
        />
        <DocumentoCard
          titulo="Fatura de Serviços"
          detalhes="Modificado há 2 semanas"
        />
        <DocumentoCard
          titulo="Termos de Serviços"
          detalhes="Modificado há 1 mês"
        />
      </div>
    </div>
  );
}

export default MeusDocumentos;
