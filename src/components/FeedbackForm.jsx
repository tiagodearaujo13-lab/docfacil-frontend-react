import { useState } from "react";
import styles from "./FeedbackForm.module.css";

function FeedbackForm() {
  // Estados do Formulário
  const [rating, setRating] = useState(0); // Nota selecionada (clique)
  const [hover, setHover] = useState(0); // Nota visual (passar o rato)

  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("");
  const [testemunho, setTestemunho] = useState("");

  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // AQUI NO FUTURO: Enviar para o Backend (PostgreSQL)
    // Por agora, simulamos o sucesso:
    console.log({ rating, nome, profissao, testemunho });
    setEnviado(true);
  };

  return (
    <div className={styles.feedbackSection}>
      <div className={styles.container}>
        {!enviado ? (
          <div className={styles.formCard}>
            <div className={styles.headerForm}>
              <h2>A sua opinião vale ouro. 🏆</h2>
              <p>
                Ajude-nos a melhorar o DocFacil.pt. O seu testemunho pode
                aparecer na nossa página principal!
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* --- ESTRELAS INTERATIVAS --- */}
              <div className={styles.starContainer}>
                <label>Como avalia a sua experiência?</label>
                <div className={styles.stars}>
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={
                          ratingValue <= (hover || rating)
                            ? styles.starOn
                            : styles.starOff
                        }
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        <span className={styles.starIcon}>★</span>
                      </button>
                    );
                  })}
                </div>
                <span className={styles.ratingText}>
                  {rating === 5
                    ? "Excelente! 🤩"
                    : rating === 4
                    ? "Muito Bom 🙂"
                    : rating > 0
                    ? "Obrigado pela avaliação"
                    : "Selecione as estrelas"}
                </span>
              </div>

              {/* --- MENSAGEM --- */}
              <div className={styles.inputGroup}>
                <label htmlFor="testemunho">O seu testemunho</label>
                <textarea
                  id="testemunho"
                  rows="4"
                  placeholder="Conte-nos como o DocFacil ajudou no seu dia-a-dia..."
                  value={testemunho}
                  onChange={(e) => setTestemunho(e.target.value)}
                  required
                />
              </div>

              {/* --- DADOS PESSOAIS (Lado a Lado) --- */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="O seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="profissao">Profissão / Cargo</label>
                  <input
                    type="text"
                    id="profissao"
                    placeholder="Ex: Advogado, Freelancer..."
                    value={profissao}
                    onChange={(e) => setProfissao(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.botaoSubmit}>
                Enviar Avaliação
              </button>
            </form>
          </div>
        ) : (
          // --- MENSAGEM DE SUCESSO ---
          <div className={styles.successCard}>
            <div className={styles.successIcon}>🎉</div>
            <h2>Obrigado, {nome}!</h2>
            <p>O seu feedback foi recebido com sucesso.</p>
            <p className={styles.successNote}>
              A nossa equipa irá rever o seu testemunho em breve.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className={styles.botaoVoltar}
            >
              Enviar outro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackForm;
