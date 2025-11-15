import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import GoogleLoginButton from './GoogleLoginButton.jsx';

function RegistoForm () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
      // A Função para o clique em "Criar Conta"
    const handleSubmit = async (evento) => {
      // Verificação logica if/else
        evento.preventDefault();
        if (password !== confirmPassword) {
            alert("As password não são iguais!");
            return;
        }

        // O Telefonema
        console.log("A 'telefonar' para o Backend para registar:", email);
        // O Telefonema (Fetch)
        try {
            const response = await fetch('http://localhost:3000/registo', {
                method: 'Post', // O Telefonema de Enviar DADOS
                headers: {'Content-Type': 'application/json',}, // O Idioma a falar JSON
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            // Ouvir a resposta do Backend
            if (response. status === 201) {
                // Sucesso!! 201 = criado com Sucesso
                alert("Conta criada com sucesso! Por favor, faça o login.");

                // Proxima parte, mandar o usuario para a página de Login automaticamente!

            
            } else {
                // Erro! ex: 400 = "Email já existe"
                const data = await response.json(); // Ver se o Backend mandou uma mensagem de erro
                alert("Erro ao criar conta: " + (data.message || "Tente novamente."));
            }
        } catch (erro) {
        // ERRO DE REDE! ex: O Backend está "desligado"
        console.error("Erro de rede:", erro);
        alert("Não foi possivel ligar ao servidor. O Backend está ligado?");  
        
         }

      

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