const form_field = document.getElementById('form-field');
const start_quiz = document.getElementById('start-quiz');

const questions = document.getElementById('qtn');
const option_1 = document.getElementById('option1');
const option_2 = document.getElementById('option2');
const option_3 = document.getElementById('option3');
const option_4 = document.getElementById('option4');
const submit = document.getElementById('submit');
const answers = document.querySelectorAll('.answer');
const showScore = document.querySelector('#showScore');

let ID = "";


let obj1 = {
    question: this.question,
    option1: this.option1,
    option2: this.option2,
    option3: this.option3,
    option4: this.option4,
    answer: this.answer
}

const quiz_data_section = document.getElementsByClassName('quiz-data');

let no_of_qtn = 0;
document.getElementById('no-of-qtn').innerHTML =no_of_qtn;
let questionArray = [];


form_field.addEventListener('submit',(e)=>{
    e.preventDefault();
    ++no_of_qtn;
    console.log(no_of_qtn);
    document.getElementById('no-of-qtn').innerHTML = no_of_qtn;
    let question = form_field.question.value;
    let option1 = form_field.option1.value;
    let option2 = form_field.option2.value;
    let option3 = form_field.option3.value;
    let option4 = form_field.option4.value;
    let answer = form_field.answer.value;
    obj1 = { question, option1, option2,option3,option4, answer };
    questionArray.push(obj1);
    console.log(questionArray);
    localStorage.setItem("questionData", JSON.stringify(questionArray));
    form_field.reset();
});

const quiz_area = document.getElementById('quiz-area');



const quiz_data = JSON.parse(localStorage.getItem("questionData", questionArray));
let questionCount = 0;
let score = 0;

const startQuiz = () => {
    const question_data = quiz_data[questionCount];
    questions.innerText = question_data.question;
    option_1.innerText = question_data.option1;
    option_2.innerText = question_data.option2;
    start_quiz.style.display = "block";
}

function getCheckAnswer() {
    let answer;
    answers.forEach((currentAnswer) => {
        if (currentAnswer.checked) {
            answer = currentAnswer.id;
        }

    });
    return answer;
}

const deSelectOptions = () => {
    answers.forEach((currentAnswer) => {
        currentAnswer.checked = false;
    })
}


submit.addEventListener('click', () => {
    const checkAnswer = getCheckAnswer();

    if (checkAnswer === quiz_data[questionCount].answer) {
        score++;
        console.log(score);
    };

    questionCount += 1;
    if (questionCount < quiz_data.length) {
        deSelectOptions();
        startQuiz();
    }
    else {
        showScore.innerHTML = `
           <h3> Your Score:  ${score}/${quiz_data.length} </h3>
           <br><br>
           <h3> Correct: ${score}&nbsp&nbsp&nbsp&nbspIncorrect: ${quiz_data.length - score} </h3>
           <button class="btn3" onclick="location.reload()">Restart</button>
        `;

        // showScore.classList.remove('scoreArea');
    }
});


const saveQuiz =async(ID) =>{
    let noOfQestions = no_of_qtn;
    let questions =JSON.parse(localStorage.getItem("questionData", questionArray));
    let title = document.getElementById("title").value;
    console.log(questions);
    try {
        const res = await fetch(`/saveTest/${ID}`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                noOfQestions,
                questions
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        localStorage.removeItem("questionData");
        const data = await res.json();
        if(data){
            console.log(data);
            document.getElementById('show-quiz-link').style.display ="block";
            document.getElementById('link').value = `http://localhost:8000/mcq/${data}`;
            document.getElementById('direct-link').innerHTML=`
                <a href='http://localhost:2000/mcq/${data}' target='_blank'><b>click here to go to test</b></a>
            
            `
        }
    }catch (err) {
        console.log(err);
    }
}





const getAdminData = async() => {
    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch('/getNormalAdminDetails', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        ID = data._id;
        document.getElementById('save-quiz-data').innerHTML=`
            <button class="btn1" onclick="saveQuiz(ID)"><a href="#show-quiz-link" style="text-decoration: none; color:white;">Create Quiz</a></button>
        `
    }catch (err) {
        console.log(err);
    }
};

getAdminData();