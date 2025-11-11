import { useState } from 'react';
import styles from './FAQ.module.css';

function FAQItem (props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {

        setIsOpen (!isOpen);
    };

    return (
        <div className={styles.faqItem}>

            <div className={styles.pergunta} onClick={toggleOpen}>
                {props.pergunta}

                <span className={styles.iconeToggle}>
                    {isOpen ? 'X' : '+'}
                </span>
            </div>

            {isOpen && (
                <div className={styles.resposta}>
                    <p>{props.resposta}</p>
                </div>
            )}
        </div>
    );
}

export default FAQItem;