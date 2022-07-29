const userPoints = document.getElementById('user-points');
const quizCardArea = document.getElementById('quiz-card-area');



let userID ='';

let userQuizData =[];
let current_page = 1;
let records_per_page = 4;

const prevPage=()=>{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}
const nextPage=()=>{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

const  changePage=(page)=>{
    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    quizCardArea.innerHTML = "";

    for (let i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        quizCardArea.innerHTML += `
        
        <div class="card-group-row__col col-md-6">

        <div class="card card-group-row__card card-sm">
            <div class="card-body d-flex align-items-center">
                <a href="student-take-quiz.html"
                   class="avatar overlay overlay--primary avatar-4by3 mr-12pt">
                    <img src="/Theme/images/paths/angular_routing_200x168.png"
                         alt="Angular Routing In-Depth"
                         class="avatar-img rounded">
                    <span class="overlay__content"></span>
                </a>
                <div class="flex mr-12pt">
                    <a class="card-title"
                       href="student-take-quiz.html">${userQuizData[i].test.title}</a>
                    
                </div>
                <div class="d-flex flex-column align-items-center">
                    <span class="lead text-headings lh-1">${userQuizData[i].marksScored}</span>
                    <small class="text-50 text-uppercase text-headings">Score</small>
                </div>
            </div>

            <div class="progress rounded-0"
                 style="height: 4px;">
                <div class="progress-bar bg-primary"
                     role="progressbar"
                     style="width: 25%;"
                     aria-valuenow="25"
                     aria-valuemin="0"
                     aria-valuemax="100"></div>
            </div>

            <div class="card-footer">
                <div class="d-flex align-items-center">
                    <div class="flex mr-2">
                        <a href="student-take-quiz.html"
                           class="btn btn-light btn-sm">

                            <i class="material-icons icon--left">refresh</i> Continue

                        </a>
                    </div>

                    <div class="dropdown">
                        <a href="#"
                           data-toggle="dropdown"
                           data-caret="false"
                           class="text-muted"><i class="material-icons">more_horiz</i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="student-take-quiz.html"
                               class="dropdown-item">Continue</a>
                            <a href="student-quiz-result-details.html"
                               class="dropdown-item">View Result</a>
                            <div class="dropdown-divider"></div>
                            <a href="student-take-quiz.html"
                               class="dropdown-item text-danger">Reset Quiz</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
   
        
        
        `
    }

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}




const numPages=()=>{
    return Math.ceil(userQuizData.length / records_per_page);
}


const loadData = async (userId)=>{
    userID = userId;
    console.log(userId);
    try{
        const res = await fetch(`/userQuizData/${userId}`,{
            method:'GET',
            contentType:'application/json'
        });
        
        const data = await res.json();
        if(data){
            console.log(data.userPoints);
            let labeldata=[]; //Array for labels of graph
            let marksdata=[]; //Array for marks data in graph
            
            userPoints.innerHTML = `${data.userPoints} points`;

            data.userQuizes.forEach(element=>{
                marksdata.push(element.marksScored);
                labeldata.push(`${element.test.title}`);
                userQuizData.push(element);
            })
            console.log(userQuizData);
           


            changePage(1);

        }
    }catch(err){
        console.log(err);
    }
}


