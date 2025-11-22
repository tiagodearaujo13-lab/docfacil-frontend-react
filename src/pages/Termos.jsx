import React from "react";
import styles from "./Page.module.css"; // Vamos criar este CSS genérico a seguir

function Termos() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1>Termos e Condições de Uso</h1>
        <p className={styles.lastUpdate}>
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <section>
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Bem-vindo ao <strong>DocFacil.pt</strong>. Ao criar uma conta,
            aceder ou utilizar a nossa plataforma, o utilizador concorda em
            ficar vinculado aos presentes Termos e Condições, bem como à nossa
            Política de Privacidade. Se não concordar com qualquer parte destes
            termos, não deverá utilizar os nossos serviços.
          </p>
        </section>

        <section>
          <h2>2. Descrição do Serviço e Isenção de Responsabilidade Legal</h2>
          <p>
            O DocFacil.pt é uma ferramenta tecnológica de automação que auxilia
            na criação de documentos jurídicos e administrativos.
            <strong>Importante:</strong> O DocFacil.pt{" "}
            <u>não é uma sociedade de advogados</u> e não presta aconselhamento
            jurídico.
          </p>
          <p>
            Os modelos disponibilizados são baseados na legislação portuguesa em
            vigor, mas a sua utilização e adequação ao caso concreto são da
            inteira e exclusiva responsabilidade do utilizador. Recomendamos
            que, para situações complexas, os documentos gerados sejam revistos
            por um advogado devidamente inscrito na Ordem dos Advogados. O
            DocFacil.pt não se responsabiliza por quaisquer perdas ou danos
            resultantes do uso incorreto dos documentos.
          </p>
        </section>

        <section>
          <h2>3. Contas de Utilizador</h2>
          <p>
            Para aceder a certas funcionalidades, deverá criar uma conta. O
            utilizador compromete-se a fornecer informações verdadeiras, exatas
            e completas. A confidencialidade da palavra-passe é da exclusiva
            responsabilidade do utilizador. Qualquer atividade realizada através
            da sua conta será considerada da sua responsabilidade.
          </p>
        </section>

        <section>
          <h2>4. Subscrições, Pagamentos e Cancelamento</h2>
          <ul>
            <li>
              <strong>Planos Pagos:</strong> O acesso a funcionalidades "Pro"
              requer o pagamento de uma subscrição (mensal ou anual).
            </li>
            <li>
              <strong>Renovação Automática:</strong> As subscrições renovam-se
              automaticamente no final de cada período, salvo se canceladas pelo
              utilizador.
            </li>
            <li>
              <strong>Cancelamento:</strong> O utilizador pode cancelar a sua
              subscrição a qualquer momento através do painel de controlo. O
              acesso às funcionalidades Pro manter-se-á até ao final do ciclo de
              faturação corrente.
            </li>
            <li>
              <strong>Reembolsos:</strong> Dada a natureza digital do produto,
              não efetuamos reembolsos parciais por períodos não utilizados,
              exceto nos casos previstos na Lei de Defesa do Consumidor.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Propriedade Intelectual</h2>
          <p>
            <strong>Da Plataforma:</strong> Todos os direitos sobre o software,
            design, logótipos e código-fonte do DocFacil.pt são propriedade
            exclusiva da nossa empresa.
          </p>
          <p>
            <strong>Dos Seus Documentos:</strong> O utilizador detém a
            propriedade integral sobre os dados que insere e os documentos
            finais que gera. O DocFacil.pt não reivindica qualquer direito de
            propriedade sobre os seus contratos criados.
          </p>
        </section>

        <section>
          <h2>6. Limitação de Responsabilidade</h2>
          <p>
            Na máxima extensão permitida pela lei portuguesa, o DocFacil.pt e os
            seus colaboradores não serão responsáveis por quaisquer danos
            diretos, indiretos, incidentais ou consequenciais resultantes do uso
            ou incapacidade de uso do serviço, ou da confiança depositada em
            qualquer informação obtida através do serviço.
          </p>
        </section>

        <section>
          <h2>7. Lei Aplicável e Foro</h2>
          <p>
            Estes Termos regem-se pela lei portuguesa. Para a resolução de
            qualquer litígio emergente deste contrato, as partes escolhem o foro
            da Comarca de Lisboa, com expressa renúncia a qualquer outro.
          </p>
        </section>

        <div className={styles.footerNote}>
          <p>Dúvidas? Contacte-nos através da nossa página de contacto.</p>
        </div>
      </div>
    </div>
  );
}

export default Termos;
