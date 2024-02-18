import styles from './Header.module.css'
export const Header = ({ questionsLength, activeQuestion, onPrevClick }) => {

    return (
        <header className={styles.container}>
            <div className={styles.counter}>
                {activeQuestion > 1 &&
                    <div className="arrow-box" onClick={onPrevClick}>
                        <img className="arrow" src="/assets/back.svg" alt="arrow back" />
                    </div>
                }
                <div className={styles.numbers}>
                    <span className="accent">{activeQuestion}</span>
                    <span>/{questionsLength}</span>
                </div>
            </div>
            <div className={styles.progress}>
                <div className="progress-bar" style={{ backgroundColor: "var(--pink)", width: `calc((100% / 5) * ${activeQuestion})` }} />
            </div>
        </header>
    );
}


