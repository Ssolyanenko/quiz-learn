import React, {useContext, useRef, useState} from "react";
import {useTranslation} from 'react-i18next';

import Lottie from "lottie-react";
import {Button} from "../../components";
import {QuizContext} from "../../context/Provider";
import Checked from '../../assets/Check.json';
import Download from '../../assets/Download.json'

import styles from './Success.module.css'

export const Success = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const LottieRef = useRef(null);

    const toggleAnimation = () => {
        LottieRef.current.play()
        setIsPlaying(!isPlaying);
    };
    const {reset} = useContext(QuizContext);
    const {t} = useTranslation();
    const quiz = localStorage.getItem('quiz');
    const email = localStorage.getItem('email')
    const downloadAnswers = async () => {
        const res = JSON.parse(quiz);

        const emailObj = {
            number: 6, question: 'Email', type: 'email', answer: [email.toString()]
        }
        res.push(emailObj);

        let csvContent = "Order,Title,Type,Answer\n";
        res.forEach(item => {
            const order = item.number;
            const type = item.type;
            const title = item.question;
            const answer = Array.isArray(item.answer) ? item.answer.join(', ') : item.answer;

            const escapedTitle = title.replace(/"/g, '""');
            const escapedAnswer = answer.replace(/"/g, '""');

            csvContent += `${order},"${escapedTitle}","${type}","${escapedAnswer}"\n`;
        });

        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'quiz_answers.csv');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };


    return (<div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.titleArea}>
                    <h2 className={styles.title}>{t('thankYou')}</h2>
                    <p className={styles.message}>{t('thankYouMessage')}</p>
                </div>
                <Lottie animationData={Checked} loop={false}/>
            </div>
            <button className={styles.button} onClick={() => {
                toggleAnimation();
                downloadAnswers();
            }}>
                <Lottie style={{width: 50}} lottieRef={LottieRef} animationData={Download} loop={false}
                        autoplay={isPlaying}/>
                <span>{t('downloadButton')}</span>
            </button>
            <Button onClick={reset}>{t('retakeQuizButton')}</Button>
        </div>);
}
