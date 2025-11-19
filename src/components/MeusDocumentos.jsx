import { useState, useEffect } from "react";
import styles from "./MeusDocumentos.module.css";

// Sub-peça para cada cartão de documento
function DocumentoCard(props) {
  return (
    <div className={styles.docCard}>
      <div className={styles.cardImagen}>
        {/* Aqui onde vai as imagens dos documentos*/}
      </div>
      <h4>{props.titulo}</h4>
      <p>{props.tipo_documento}</p>
    </div>
  );
}

function MeusDocumentos() {
  // 1. "Memória" para guardar a lista de documentos que vem do Backend
  const [listaDocs, setListDocs] = useState([]);

  // 2. "Receita" para BUSCAR documentos (GET)
  // Executa assim que a página carrega (useEffect)
  useEffect(() => {
    carregarDocumentos();
  }, []);

  const carregarDocumentos = async () => {
    const token = localStorage.getItem("token"); //Pegar o Chachá

    try {
      const response = await fetch("http://localhost:3000/meus-documentos", {
        method: "GET",
        headers: {
          //MOSTRAR O CRACHÁ AO SEGURANÇA
          Authorizatin: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const dados = await response.json();
        setListDocs(dados); //Guardar na memória para o React desenhar
        console.log("Documentos carregados:", dados);
      }
    } catch (error) {
      console.error("Erro ao buscar documento:", error);
    }
  };

  // 3. "Receita" para CRIAR um novo documento (POST)
  const handleNovoDocumento = async () => {
    // Por agora, usamos um "prompt" simples para pedir o nome
    const tituloDoDoc = prompt("Qual o nome do novo documento?");

    if (!tituloDoDoc) return; // Se cancelou, não faz nada

    const token = localStorage.getItem("token"); // Pegar o Crachá

    try {
      const response = await fetch("http://localhost:300/criar-documento", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Mostrar o Crachá
        },
        body: JSON.stringify({
          titulo: tituloDoDoc,
          tipo_documento: "Contrato Genérico",
        }),
      });

      if (response.status === 201) {
        alert("Documento criado com sucesso!");
        // Recarregar a lista para mostrar o novo documento imediatamente!
        carregarDocumentos();
      } else {
        alert("Erro ao criar.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainHeader}>
        <div>
          <h2>Meus Documentos</h2>
          <p>Todos os seus documentos criados e guardados.</p>
        </div>
        <button className={styles.botaoNovoDoc} onClick={handleNovoDocumento}>
          + Novo Documento
        </button>
      </div>

      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar nos seus documentos..."
          className={styles.barraPesquisa}
        />
      </div>

      <div className={styles.gridDocs}>
        {/* Se a lista estiver vazia, mostre uma mensagem */}
        {listaDocs.length === 0 && (
          <p style={{ color: "#a0aec0" }}>
            Ainda não tem documentos. Crie o primeiro!{" "}
          </p>
        )}

        {/* Loop (Map) para desenhar cada documento real da lista */}
        {listaDocs.map((doc) => (
          <DocumentoCard
            key={doc.id}
            titulo={doc.titulo}
            tipo_documento={doc.tipo_documento}
          />
        ))}
      </div>
    </div>
  );
}

export default MeusDocumentos;
