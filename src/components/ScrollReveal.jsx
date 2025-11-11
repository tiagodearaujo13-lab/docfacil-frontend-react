import { useInView } from 'react-intersection-observer';
import styles from './ScrollReveal.module.css';

function ScrollReveal({ children }) {

    const { ref, inView } = useInView ({
        threshold: 0.1,
        triggerOnce: true,
    });

    const classes = `${styles.hidden} ${inView ? styles.visible : ''}`;

    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
}

export default ScrollReveal;