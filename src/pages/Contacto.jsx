import { useState } from "react";
import styles from "./Contacto.module.css";
import { useToast } from "../contexts/ToastContext.jsx";

function Contacto() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("enviando");

    try {
      // Chama o servidor de verdade!
      const res = await fetch(
        "https://meu-backend-api-rohr.onrender.com/enviar-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        showToast("Mensagem enviada com sucesso! 🚀", "sucesso");
        setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
      } else {
        showToast("Erro ao enviar mensagem.", "erro");
      }
    } catch (err) {
      showToast("Erro de conexão.", "erro");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.headerContact}>
          <h1>Fale Connosco</h1>
          <p>A nossa equipa está pronta para ajudar o seu negócio a crescer.</p>
        </div>

        <div className={styles.gridContact}>
          {/* COLUNA 1: Informações (A Fachada Profissional) */}
          <div className={styles.infoCard}>
            <h3>Canais Oficiais</h3>
            <p className={styles.infoText}>
              Precisa de suporte rápido? Estamos disponíveis nos dias úteis.
            </p>

            <div className={styles.infoItem}>
              <span className={styles.icon}>📧</span>
              <div>
                <strong>Email Geral</strong>
                <span>suporte@docfacil.pt</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <strong>Sede Digital</strong>
                {/* Morada estratégica: Verdadeira mas profissional */}
                <span>Algarve</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>💼</span>
              <div>
                <strong>Horário de Atendimento</strong>
                <span>Seg - Sex, 09:00 às 18:00</span>
              </div>
            </div>
          </div>

          {/* COLUNA 2: Formulário */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Como se chama?"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email Profissional</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Assunto</label>
                <select
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Sobre o que quer falar?
                  </option>
                  <option value="suporte">Preciso de ajuda técnica</option>
                  <option value="faturacao">Dúvidas sobre Planos</option>
                  <option value="parceria">Parcerias / Imprensa</option>
                  <option value="outros">Outro assunto</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Mensagem</label>
                <textarea
                  name="mensagem"
                  rows="5"
                  placeholder="Descreva a sua dúvida em detalhe..."
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={styles.botaoEnviar}
                disabled={status === "enviando"}
              >
                {status === "enviando" ? "A enviar..." : "Enviar Mensagem"}
              </button>

              {status === "sucesso" && (
                <div className={styles.msgSucesso}>
                  ✅ Recebido! Entraremos em contacto brevemente.
                </div>
              )}

              {status === "erro" && (
                <div className={styles.msgErro}>
                  ❌ Algo correu mal. Tente novamente.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
