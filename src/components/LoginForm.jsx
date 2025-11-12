import { useState } from 'react';
import styles from './LoginForm.module.css';

function LoginForm () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (evento) => {

        evento.preventDefalt();

        console.log("--- Tentativa De Login ---");
        console.log("Email:", email);
        console.log("Password:", password);
    
    };

    return (

        <div className={styles.formCard}>

            <h2>Login</h2>

            <p>Bem-vindo de volta! Faça login para aceder aos seus documentos.</p>

            <form className={styles.form} onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input 
                type="email"
                id="email"
                placeholder="o.seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />

                 <label htmlFor="password">Password</label>
                 <input 
                 type="password"
                 id="password"
                 placeholder="A sua password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                  />

                  <button type="submit" className={styles.botaoLaranja}>
                    Entrar
                  </button>
                  
            </form>
        </div>
    );
}

export default LoginForm;