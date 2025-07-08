import Quiz from "./quiz.js";
// call api
async function getQuestionFromAPI({ category, numberOfQuestion, difficulty }) {
    let response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${difficulty}`)
    let result = await response.json()
    return result ;
}
export default class QuizSetting {
    constructor() {
        this.categoryInput = document.getElementById('category')
        this.difficultyInput = Array.from(document.getElementsByName('difficulty'))
        this.numberOfQuestion = document.getElementById('numberOfQuestion')
    }

    async runQuiz() {
        // collect data from input
        let { category, numberOfQuestion, difficulty } = this.collectDataFromInput()
        const data = await getQuestionFromAPI({ category, numberOfQuestion, difficulty })

        const quiz = new Quiz(data)
        quiz.startQuiz()

    }

    collectDataFromInput() {
        const category = this.categoryInput.value

        const difficulty = this.difficultyInput.find((element) => element.checked).value

        const numberOfQuestion = this.numberOfQuestion.value
        // if(this.numberOfQuestion.value == `` || this.numberOfQuestion.value == 1){
        //     console.log('no');
        // }

        return {
            category,
            numberOfQuestion,
            difficulty
        }
    }
}