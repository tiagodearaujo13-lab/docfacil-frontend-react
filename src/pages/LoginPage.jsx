import LoginForm from '../components/LoginForm.jsx';

import styles from './Page.module.css';

function LoginPage() {
    return (

        <div className={styles.pageContainer}>
    <LoginForm />
    </div>
    );
}

export default LoginPage;