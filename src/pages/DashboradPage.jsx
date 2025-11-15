import styles from './Page.module.css';

function DashboardPage() {
    return(
        <div className={styles.pageContainer}>
            <div style={{color: '#1a202c', textAlign: 'center'}}>
                <h1>Dashboard</h1>
                <p>Se Aparecer, deu certo!</p>
            </div>
        </div>
    );
}

export default DashboardPage;