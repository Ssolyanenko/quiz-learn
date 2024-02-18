import React, {useState} from 'react';
import styles from './Main.module.css'
import {useTranslation} from "react-i18next";

const LANGUAGE = {
    'English': "en",
    "French": "fr",
    "German": "de",
    "Spanish": "es"
}

export const Main = ({question, answer, setAnswer, setLng}) => {
    const [options,setOptions] = useState([])
    const { t } = useTranslation();
    const FEMALE = t('quiz.1.options.0')
    const MALE = t('quiz.1.options.1')
    const OTHER = t( 'quiz.1.options.2')
    const handleLabelClick = (opt) => {
      setOptions(opt)
    };
    const onChangeHandler = (e) => {
        if (question.number === 1) {
            setLng(LANGUAGE[e.target.value]);
        }

        switch (question.type) {
            case 'single-select':
                setAnswer([e.target.value])
                break;

            case 'multiple-select':
                if (e.target.checked) {
                    const newAnswer = [...answer, e.target.value];
                    setAnswer(newAnswer);
                } else {
                    const newAnswer = [...answer].filter(a => a !== e.target.value);
                    setAnswer(newAnswer);
                }

                break;

            case 'bubble':
                if (e.target.checked) {
                    const newAnswer = [...answer, e.target.value];
                    setAnswer(newAnswer);
                } else {
                    const newAnswer = [...answer].filter(a => a !== e.target.value);
                    setAnswer(newAnswer);
                }

                break;

            default:
                break;
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.questionArea}>
                <h3 className={styles.title}>{question.question}</h3>
                {question.description && <p className={styles.message}>{question.description}</p>}
            </div>
            <div className={`${styles.optionsArea} ${question.number === 2 && styles.identify} `}>
                {question.options.map(opt => {
                    if (opt === FEMALE) {
                        return (
                            <div className={`${styles.container} ${answer === 'Female' ? styles.selected : ''}`}
                                 key={opt}>
                                <label
                                    className={`${styles.option} ${answer.toString() === 'Female' ? styles.selected : ''}`}>
                                    <input
                                        name="radio"
                                        type="radio"
                                        value="Female"
                                        checked={answer === 'Female'}
                                        onChange={onChangeHandler}
                                        style={{display: "none"}}
                                    />
                                    <span className={styles.pic}>👱‍♀️</span>
                                    <span className={styles.description}>{opt}</span>
                                </label>
                            </div>
                        )
                    } else if (opt === MALE) {
                        return (
                            <div className={`${styles.container} ${answer === 'Male' ? styles.selected : ''}`}
                                 key={opt}>
                                <label
                                    className={`${styles.option} ${answer.toString() === 'Male' ? styles.selected : ''}`}>
                                    <input
                                        name="radio"
                                        type="radio"
                                        value="Male"
                                        checked={answer === 'Male'}
                                        onChange={onChangeHandler}
                                        style={{display: "none"}}
                                    />
                                    <span className={styles.pic}>👨‍🦰</span>
                                    <span className={styles.description}>{opt}</span>
                                </label>
                            </div>
                        )
                    } else if (opt === OTHER) {
                        return (
                            <div className={`${styles.container} `} key={opt}>
                                <label
                                    className={`${styles.option} ${answer.toString() === 'Other' ? styles.selected : ''}`}>
                                    <input
                                        name="radio"
                                        type="radio"
                                        value="Other"
                                        checked={answer === 'Other'}
                                        onChange={onChangeHandler}
                                        style={{display: "none"}}
                                    />
                                    <span className={styles.pic}>😉️</span>
                                    <span className={styles.description}>{opt}</span>
                                </label>
                            </div>
                        )
                    } else {
                        return (
                            <label
                                key={opt}
                                className={`${styles.option} ${options === opt ? styles.selected : ''}`}
                                onClick={() => handleLabelClick(opt)}>
                                <input
                                    name="checkbox"
                                    defaultChecked={question.answer?.includes(opt)}
                                    type={question.type === "single-select" ? "radio" : "checkbox"}
                                    value={opt}
                                    onChange={onChangeHandler}
                                    style={{display: "none"}}
                                />
                                <span>{opt}</span>
                                {question.type !== "single-select" &&
                                    <div className={styles.checkbox}>
                                        <svg
                                            fill="transparent"
                                            height="13px"
                                            width="13px"
                                            viewBox="0 0 490 490"
                                        >
                                            <polygon
                                                points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "></polygon>
                                        </svg>
                                    </div>
                                }
                            </label>
                        );
                    }
                })}
            </div>
        </main>
    );
};
