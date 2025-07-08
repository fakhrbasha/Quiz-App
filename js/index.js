import QuizSetting from "./quizSetting.js";

let Setting = document.getElementById('Setting')
const quiz = new QuizSetting();
document.getElementById('startBtn').addEventListener('click' , function(){
    quiz.runQuiz()
})