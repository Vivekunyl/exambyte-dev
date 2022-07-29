let quizData = [];

const questions = document.getElementById('qtn');
const option_1 = document.getElementById('option1');
const option_2 = document.getElementById('option2');
const option_3 = document.getElementById('option3');
const option_4 = document.getElementById('option4');
const submit = document.getElementById('submit');
const answers = document.querySelectorAll('.answer');
const previousBtn = document.getElementById('go-back');
const optionArea = document.getElementById('option-area');
const questionUpdate = document.getElementById('question-update');


let questionCount = 0;
let score = 0;
let inputsId = [];
let userID = null;
let quizID = null;
let points = 0;

const startQuiz = () => {
    if(questionCount === 0){
        previousBtn.style.display = "none";
    }
    else if(questionCount === window.quizData.length-1){
        submit.innerText = "Submit";
    }
    else{
        previousBtn.style.display = "block";
        submit.style.display = "block";
    }
    const question_data = window.quizData[questionCount];
    questionUpdate.innerHTML = `Question ${questionCount+1} of ${window.quizData.length}`
    questions.innerText = question_data.question;
    option_1.innerText = question_data.option1;
    option_2.innerText = question_data.option2;
    option_3.innerText = question_data.option3;
    option_4.innerText = question_data.option4;
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


const previousSelection = () => {
    let inputId = inputsId[questionCount];
    document.getElementById(inputId).checked = true;
}


previousBtn.addEventListener('click', () => {
    questionCount -= 1;
    startQuiz();
    let inputId = inputsId[questionCount];
    document.getElementById(inputId).checked = true;

});

const isAlreadySelected = (checkAnswer) => {
    // debugger;
    if (inputsId[questionCount] === undefined) {
        return 0;
    }
    else {
        if (window.quizData[questionCount].answer === checkAnswer) {
            score++;
            return 1;
        }
        else {
            score--;
            return 1;
        }
    }
}


const checkRepeatedAnswer = (checkAnswer) => {
    if (checkAnswer === inputsId[questionCount]) {
        return 0;
    }
    else {
        if (isAlreadySelected(checkAnswer) == 0) {
            inputsId[questionCount] = checkAnswer;
            return 1;
        }
        else {
            inputsId[questionCount] = checkAnswer;
            return 0;
        }
    }

}


const saveQuizData = async(score,userid,quizid)=>{
    const test = quizid;
    const points = score;
    try{
        const res = await fetch(`/saveUserQuizData/data?userID=${userid}`,{
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                tests:{test:test,
                        marksScored:points
                      },
                points:points
            })
        });

        const data = await res.json();
        if(res.status === 200){
            console.log('data saved');
        }

    }catch(err){
        console.log(err);
    }
}



submit.addEventListener('click', () => {
    const checkAnswer = getCheckAnswer();
    if (checkRepeatedAnswer(checkAnswer) != 0) {
        // inputsId.push(checkAnswer);
        console.log(inputsId);
        if (checkAnswer === window.quizData[questionCount].answer) {
            score++;
            console.log(score);
        }
    }
    questionCount += 1;
    if (questionCount < window.quizData.length && questionCount >= inputsId.length) {
        deSelectOptions();
        startQuiz();
    }
    else if (questionCount < window.quizData.length && questionCount < inputsId.length) {
        startQuiz();
        previousSelection();
    }
    else {
       
        optionArea.style.display='none';
        questionUpdate.innerHTML = `Your Score: ${score}/${window.quizData.length}`
        window.points = score;
        let userid = window.userID;
        let quizid = window.quizID;
        saveQuizData(score,userid,quizid);
        // showScore.classList.remove('scoreArea');
    }

});







const getTestData = async (slug,userid) => {
    let queryString = window.location.href;
    console.log(queryString);
    // let slug = queryString.substring(26);
    window.userID = userid;
    console.log(slug);
    try {
        const res = await fetch(`/getTestData/${slug}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            document.title = `${slug} ExamBytes`;
            window.quizData = data[0].questions;
            window.quizID = data[0]._id;
            console.log(quizData);
            console.log(window.quizData);
            startQuiz();
        }

    } catch (err) {
        console.log(err);
    }
}

// getTestData();


