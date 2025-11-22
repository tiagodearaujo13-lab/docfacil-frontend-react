import React from "react";
import styles from "./Page.module.css";

function Privacidade() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1>Política de Privacidade (RGPD)</h1>
        <p className={styles.lastUpdate}>
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <section>
          <h2>1. Compromisso de Privacidade</h2>
          <p>
            A proteção da sua privacidade e dos seus dados pessoais é uma
            prioridade fundamental para o <strong>DocFacil.pt</strong>. Esta
            política explica como recolhemos, usamos e protegemos as suas
            informações, em estrito cumprimento com o Regulamento Geral sobre a
            Proteção de Dados (UE) 2016/679 ("RGPD").
          </p>
        </section>

        <section>
          <h2>2. Responsável pelo Tratamento</h2>
          <p>
            A entidade responsável pelo tratamento dos dados é a empresa
            proprietária do DocFacil.pt. Para quaisquer questões relacionadas
            com a proteção de dados, poderá contactar-nos através do email:{" "}
            <strong>privacidade@docfacil.pt</strong>.
          </p>
        </section>

        <section>
          <h2>3. Dados que Recolhemos</h2>
          <p>
            Recolhemos apenas os dados estritamente necessários para o
            funcionamento do serviço:
          </p>
          <ul>
            <li>
              <strong>Dados de Conta:</strong> Nome, endereço de email e
              palavra-passe (encriptada).
            </li>
            <li>
              <strong>Dados de Faturação:</strong> NIF, morada e histórico de
              pagamentos (processados externamente pelo Stripe).
            </li>
            <li>
              <strong>Dados dos Documentos:</strong> As informações que insere
              nos formulários para gerar os seus contratos.
            </li>
            <li>
              <strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador e
              logs de acesso para segurança do sistema.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Finalidade do Tratamento</h2>
          <p>
            Os seus dados são tratados para as seguintes finalidades lícitas:
          </p>
          <ul>
            <li>
              Prestação do serviço SaaS (criação e armazenamento de documentos).
            </li>
            <li>
              Processamento de pagamentos e emissão de faturas certificadas.
            </li>
            <li>Comunicação de atualizações de serviço ou segurança.</li>
            <li>Cumprimento de obrigações legais (ex: fiscais).</li>
          </ul>
        </section>

        <section>
          <h2>5. Partilha de Dados</h2>
          <p>
            Não vendemos os seus dados a terceiros. Partilhamos dados apenas com
            prestadores de serviços essenciais para a operação, que atuam como
            subcontratantes e cumprem o RGPD:
          </p>
          <ul>
            <li>
              <strong>Neon.tech (AWS):</strong> Para alojamento seguro da base
              de dados na Europa.
            </li>
            <li>
              <strong>Stripe:</strong> Para processamento seguro de pagamentos
              com cartão.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Segurança dos Dados</h2>
          <p>
            Implementamos medidas técnicas robustas, incluindo encriptação de
            dados em trânsito (SSL/TLS) e em repouso, hashing de palavras-passe
            e backups regulares, para proteger as suas informações contra acesso
            não autorizado, perda ou alteração.
          </p>
        </section>

        <section>
          <h2>7. Os Seus Direitos</h2>
          <p>Como titular dos dados, tem o direito de, a qualquer momento:</p>
          <ul>
            <li>
              Solicitar o <strong>acesso</strong> aos dados que temos sobre si.
            </li>
            <li>
              Solicitar a <strong>retificação</strong> de dados incorretos.
            </li>
            <li>
              Solicitar o <strong>apagamento</strong> dos dados ("Direito a ser
              esquecido"), através da opção "Apagar Conta" no seu painel.
            </li>
            <li>
              Solicitar a <strong>portabilidade</strong> dos seus dados.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>
            Utilizamos cookies essenciais para manter a sua sessão de utilizador
            ativa. Não utilizamos cookies de rastreamento publicitário de
            terceiros sem o seu consentimento explícito.
          </p>
        </section>

        <div className={styles.footerNote}>
          <p>
            Reservamo-nos o direito de atualizar esta política. O uso continuado
            do serviço pressupõe a aceitação das alterações.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacidade;
