import {useState} from "react";
import {useNavigate} from "react-router-dom";

import QuizService from "../../service";
import {Button} from "../../components";

import styles from './Email.module.css';
import {useTranslation} from "react-i18next";

const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const Email = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const quizService = new QuizService();

    const openInNewWindow = () => {
        const url = 'https://www.gen.tech/en';
        window.open(url, '_blank');
    };

    const inputHandler = (e) => {
        setError(false);
        const value = e.target.value;
        setEmail(value);
    }

    const submit = async (e) => {
        e.preventDefault();
        const isValid = pattern.test(email);

        if (isValid) {
            await quizService.setEmail(email);
            navigate("/success");
        } else {
            setError(true);
        }
    }

    return (<div className={styles.gridContainer}>
        <div className={styles.mainContainer}>
            <div className={styles.titleArea}>
                <h3 className={styles.title}>{t('email')}</h3>
                <p className={styles.message}>{t('emailMessage')}</p>
            </div>
            <div className={styles.inputBox}>
                <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={inputHandler}
                    className={error ? styles.error : ""}
                />
                {error && <div className={styles.errorMessage}>{t('emailError')}</div>}
            </div>
            <p className={styles.agreementMessage}>
                {t('emailAgreement').split(' ').map((word, index) => {
                    if (index === 5 || index === 6 || index === 8 || index === 9 || index === 10) {
                        return (<span key={index} style={{color: `var(--pink)`, cursor: 'pointer'}}
                                      onClick={openInNewWindow}> {word} </span>);
                    }
                    return <span key={index}> {word}  </span>;
                })}
            </p>
        </div>
        <Button disabled={error || !email} type="submit" onClick={submit}>{t('nextButton')}</Button>
    </div>);
}
