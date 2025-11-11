import { useState } from 'react';
import styles from './FeedbackForm.module.css';

function FeedbackForm() {

    const [estrelas, setEstrelas] = useState(0);
    const [testemunho, setTestemunho] = useState('');
    const [nome, setNome] = useState('');
    const [profissao, setProfissao] = useState('');

    return(
        <div className={styles.feedbackSection}>

            <div className={styles.formCard}>
                
                <h2>Gostou do DocFacil.pt?</h2>
                
                <p>Partilhe a sua experiência connosco!</p>
                
                <form className={styles.form}>
                    
                    <label>A sua avaliação</label>
                    
                    <div className={styles.estrelasInput}>★★★★★</div>

                     <label htmlFor="testemunho">Testemunhos</label>
                     
                     <textarea
                      id="testemunho"
                      rows="4"
                      placeholder="Escreva a sua opinião..."
                      value={testemunho}
                      onChange={(e) => setTestemunho(e.target.value)}
                     />

                     <label htmlFor="nome">Nome</label>
                     <input
                      type="text"
                      id="nome"
                      placeholder="O seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                     />

                     <label htmlFor="profissao">Profissão</label>
                     <input
                      type="text"
                      id="profissao"
                      placeholder="Ex: Designer Gráfico"
                      value={profissao}
                      onChange={(e) => setProfissao(e.target.value)}
                     />

                     <button type="submit" className={styles.botaoLaranja}>
                        Submeter Testemunho
                        </button>


                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;