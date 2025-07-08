function shuffle(arr){
    const randomINdex = Math.floor(Math.random() * arr.length)
    const temp = arr[arr.length -1]
    arr[arr.length - 1] = arr[randomINdex]
    arr[randomINdex] = temp
    return arr
}

export default class Quiz {
    constructor(question) {
        this.question = question // array of Q
        this.currentQuestionIndex = 0
        this.correctTotal = 0
        console.log(question);
    }
    startQuiz() {
        document.getElementById('Setting').classList.add('show')
        document.getElementById('quiz').classList.remove('show')
        document.getElementById('totalQ').innerText = this.question.results.length
        this.#showQuestion()
        document.getElementById('next').addEventListener('click', () => {
            // if user select answer or not
            // const answers = Array.from(document.getElementsByName('answer'))
            let userAnswer = Array.from(document.getElementsByName('answer')).find((ans) => ans.checked)
            if (userAnswer == undefined) {
                document.getElementById('alert').classList.remove('d-none')
                return
            }
            userAnswer = userAnswer.value
            // if selected answer correct or not
            // console.log(this.question.results[this.currentQuestionIndex].correct_answer)
            const correct_ans = this.question.results[this.currentQuestionIndex].correct_answer
            if (correct_ans == userAnswer) {
                document.getElementById('correct').classList.replace('d-none', 'd-block')
                document.getElementById('incorrect').classList.replace('d-block', "d-none")
                this.correctTotal++

            } else {
                document.getElementById('incorrect').classList.replace('d-none', 'd-block')
                document.getElementById('correct').classList.replace('d-block', 'd-none')
            }
            const x = setTimeout(()=>{
            this.currentQuestionIndex++
            if (this.currentQuestionIndex >= this.question.results.length) {
                this.endQuiz(); 
                return; 
            }else{
                this.#showQuestion()
            }
            clearTimeout(x)
            },1200)
        })
        // const {question , incorrect_answers , correct_answer} = this.question.results[this.currentQuestionIndex]
        // incorrect_answers.push(correct_answer)
        // console.log(incorrect_answers);
        // let cartona = ``
        // for(let i=0;i<incorrect_answers.length;i++){
        //     cartona+=`
        // <li class="my-3 animate__animated text-light">
        //         <div class="d-flex align-items-center">
        //             <input type="radio" name="answer" value="${incorrect_answers[i]}">
        //             <div class="state p-success-o">
        //                 <label class="m-0 p-2" for="">${incorrect_answers[i]}</label>
        //             </div>
        //         </div>
        //     </li>
        //     `
        // }
        // document.getElementById('rowAnswer').innerHTML = cartona
        // document.getElementById('QuestionC').innerHTML = question

    }
    #showQuestion() {
        document.getElementById('correct').classList.replace('d-block', 'd-none')
        document.getElementById('incorrect').classList.replace('d-block', 'd-none')
        document.getElementById('alert').classList.add('d-none')


        const { question, incorrect_answers, correct_answer } = this.question.results[this.currentQuestionIndex]
        const answers = shuffle([...incorrect_answers, correct_answer])
        const answerHTML = answers.map((answer, i) =>
            `<li class="my-3 animate__animated text-light">
                        <div class="d-flex align-items-center">
                            <input id="${answer}_${i}" type="radio" name="answer" value="${answer}">
                            <div class="state p-success-o">
                                <label class="m-0 p-2" for="${answer}_${i}">${answer}</label>
                            </div>
                        </div>
                    </li>` )
            .join("")
        document.getElementById('currentQ').innerText = this.currentQuestionIndex + 1

        document.getElementById('rowAnswer').innerHTML = answerHTML
        document.getElementById('QuestionC').innerText = question
        
    }
    endQuiz() {
        document.getElementById('quiz').classList.add('show')
        document.getElementById('finish').classList.remove('show')
        document.getElementById('score').innerHTML = `${this.correctTotal} / ${this.question.results.length}`
        document.getElementById('tryBtn').addEventListener('click' , ()=>{
            window.location.reload()
        })
    }
}