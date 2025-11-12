import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import GoogleLoginButton from './GoogleLoginButton.jsx';

function RegistoForm () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (evento) => {

        evento.preventDefault();
        if (password !== confirmPassword) {
            alert("As password não são iguis!");
            return;
        }

        console.log("--- TENTATIVA DE REGISTO ---");
        console.log("Email:", email);
        console.log("Password:", password);

    };

    return (

        <div className={styles.formCard}>

            <h2>Cria a sua conta</h2>
            <p>Comece de graça. Não é preciso cartão de crédito.</p>

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
                placeholder="Crie um password forte"
                value={password}
                onChange={(e) => setPassword (e.target.value)}
                 />

                 <label htmlFor="confirmPassword">Confirmar Password</label>
                 <input 
                 type="password" 
                 id="confirmPassword" 
                 placeholder="Repita a password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 />

                 <button type="submit" className={styles.botaoLaranja}>
                    Criar Conta Gratuita
                 </button>


            </form>

            <div className={styles.divisor}>
                <h4 className={styles.Ou}>Ou</h4>
                </div>

            <GoogleLoginButton />

            <div className={styles.linkRegisto}>
                Já tem uma conta?
                <Link to="/login">Faça o login</Link>
            </div>

        </div>
    );
}     


export default RegistoForm;