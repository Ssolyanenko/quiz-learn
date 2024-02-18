import React, { useEffect, useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import QuizService from "../../service";
import { useTranslation } from 'react-i18next';
import { QuizContext } from "../../context/Provider";
import {Button,Main,Loading,Header} from "../../components";

import styles from "./Question.module.css";

export const Question =()=> {
    const [answer, setAnswer] = useState([]);
    const [lng, setLng] = useState('en');
    const { question, number } = useLoaderData();
    const { questionsLength, onNextClick, onPrevClick, loading } = useContext(QuizContext);
    const { t, i18n } = useTranslation();
    const quizService = new QuizService();

    useEffect(() => {
        setAnswer(question.answer ?? []);
    },[question])

    const changeLanguage = async (lng) => {
        i18n.changeLanguage(lng);
        const newData = i18n.getDataByLanguage(lng);
        await quizService.changeQuizLanguage(newData.translation.quiz);
    }

    const nextHandler = async () => {
        if(+number === 1) {
            await changeLanguage(lng);
        }
        await quizService.setAnswer(+number, answer);

        setAnswer([]);
        onNextClick();
    }

    if(loading) return <Loading/>;

    return (
        <div className={styles.container}>
            <Header activeQuestion={number} questionsLength={questionsLength} onPrevClick={onPrevClick} />
            <Main
                question={question}
                answer={answer}
                setAnswer={setAnswer}
                setLng={setLng}
            />
            <Button disabled={!answer.length} onClick={nextHandler}>{t('nextButton')}</Button>
        </div>
    );
}
