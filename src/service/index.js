import defaultData from "../resources/defoultLanguage.json";

class QuizService {

  initializeQuiz = async () => {
    const pdfData = JSON.parse(localStorage.getItem("quiz"));
    const email = localStorage.getItem("email");

    if(pdfData) {
      const curQuestion = pdfData.find(q => q.answer === null);

      return {
        currentQuestion: curQuestion?.number,
        questionsLength: pdfData.length,
        email,
      }

    } else {
      localStorage.setItem("quiz", JSON.stringify(defaultData));
      return {
        currentQuestion: 1,
        questionsLength: defaultData.length,
        email,
      }
    }
  }

  changeQuizLanguage = async (data) => {
    localStorage.setItem("quiz", JSON.stringify(data));
  }

  getQuestion = async (num) => {
    const dbData = JSON.parse(localStorage.getItem("quiz"));
    return dbData?.find(q => q.number === num);
  }

  setAnswer = async (num, answer) => {
    let dbData = JSON.parse(localStorage.getItem("quiz"));
    const newData = dbData.map(q => {
      if(q.number === num) {
        return {
          ...q,
          answer: answer
        }
      }
      return q;
    });

    localStorage.setItem("quiz", JSON.stringify(newData));
  }

  setEmail = async (email) => {
    localStorage.setItem("email", email);
  }

  resetQuiz = async () => {
    localStorage.setItem("quiz", JSON.stringify(defaultData));
    localStorage.setItem("email", '');
  }

}

export default QuizService;