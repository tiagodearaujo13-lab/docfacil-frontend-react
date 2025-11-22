import { useState } from "react";
import styles from "./Planos.module.css";
import PricingCard from "../components/PricingCard.jsx"; // Reaproveita o componente que já tem!

function Planos() {
  // No futuro, isto virá do Backend (se o user já pagou ou não)
  const [planoAtual, setPlanoAtual] = useState("Grátis");
  const [cicloAnual, setCicloAnual] = useState(false);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>💎 Subscrição e Faturação</h2>
          <p>Escolha o plano ideal para o seu volume de trabalho.</p>
        </div>

        {/* Estado Atual da Conta */}
        <div className={styles.statusCard}>
          <div>
            <span className={styles.labelStatus}>Plano Atual:</span>
            <span className={styles.valorStatus}>{planoAtual}</span>
          </div>
          {planoAtual === "Grátis" && (
            <p className={styles.avisoUpgrade}>
              Você está limitado a 3 documentos. Faça upgrade para acesso
              ilimitado.
            </p>
          )}
        </div>

        {/* Toggle Mensal / Anual */}
        <div className={styles.toggleArea}>
          <span
            className={!cicloAnual ? styles.toggleAtivo : styles.toggleInativo}
            onClick={() => setCicloAnual(false)}
          >
            Mensal
          </span>
          <span
            className={cicloAnual ? styles.toggleAtivo : styles.toggleInativo}
            onClick={() => setCicloAnual(true)}
          >
            Anual (-20%)
          </span>
        </div>

        {/* Grid de Preços */}
        <div className={styles.gridPlanos}>
          {/* CARTÃO GRÁTIS */}
          <PricingCard
            plano="Grátis"
            descricao="Para quem está a começar."
            preco="0€"
            precoDetalhe="/mês"
            features={[
              "3 Documentos por mês",
              "Modelos Básicos",
              "Exportação com Marca d'água",
              "Suporte comunitário",
            ]}
            botaoTexto={
              planoAtual === "Grátis" ? "Plano Atual" : "Voltar ao Grátis"
            }
            isPopular={false}
            // Se for o plano atual, desativamos o botão visualmente (opcional)
          />

          {/* CARTÃO PRO */}
          <div className={styles.cardProWrapper}>
            <PricingCard
              plano="Pro"
              descricao="Para profissionais sérios."
              preco={cicloAnual ? "7,90€" : "9,90€"}
              precoDetalhe={cicloAnual ? "/mês (cobrado anualmente)" : "/mês"}
              features={[
                "Documentos Ilimitados",
                "Acesso a Modelos Premium (Atas, Contratos Blindados)",
                "Sem Marca d'água",
                "Upload de Logótipo",
                "Suporte Prioritário",
              ]}
              botaoTexto="Fazer Upgrade Agora"
              isPopular={true}
            />
          </div>
        </div>

        <div className={styles.faqSection}>
          <h3>Dúvidas Frequentes</h3>
          <p>
            <strong>Posso cancelar a qualquer momento?</strong> Sim, sem
            fidelização no plano mensal.
          </p>
          <p>
            <strong>Emitem fatura com NIF?</strong> Sim, receberá a fatura
            automaticamente no e-mail.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Planos;
