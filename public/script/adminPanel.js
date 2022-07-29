//Global variable
let topicCount = 0;

function vimControlFunc() {
    location.assign("/vimeoController")
}
function newCourseController() {
    location.assign("/createCourses")
}
// Get the modal
var modal = document.getElementById('editSub');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the modal
var modal = document.getElementById('uploadFac');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the modal
var modal = document.getElementById('modal1');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Get the modal
var modal = document.getElementById('modal2');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the modal
var modal = document.getElementById('modal3');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//         // Get the modal
// var modal = document.getElementById('editFolder');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// // Get the modal
// var modal = document.getElementsByClassName('modal1');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// Get the modal
var modal = document.getElementById('editFolder');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// upload/edit subject folder
function saveData() {


    let vimId, subName, subDesc, subPrice, subFac,  subTopicfoldname, subTopicfoldId;
    vimId = document.getElementById("vimId").value;
    subName = document.getElementById("subName").value;
    subDesc = document.getElementById("subDesc").value;
    subPrice = document.getElementById("subPrice").value;
    subFac = document.getElementById("subFac").value;
    
    

    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem("Course")) ? JSON.parse(localStorage.getItem("Course")) : []
    // if(user_records.some((v)=>{return v.email==email}))
    // {
    //     alert("duplicate data");
    // }
    // else{
    
    
    user_records.push({
        "subject_id": vimId,
        "subjectName": subName,
        "subjectDescription": subDesc,
        "subjectPrice": subPrice,
        "subjectFaculty": subFac
    })
    
    
    localStorage.setItem("Course", JSON.stringify(user_records));
    
   


}

function goTotopic() {
    document.getElementById('editSub').style.display = "none";

    document.getElementById('editTopic').style.display = "block";
}

function uploadFaculty() {


    let facName, facImg, facDeg, experience;
    facName = document.getElementById("facName").value;
    facImg = document.getElementById("facImg").value;
    facDeg = document.getElementById("facDeg").value;
    experience = document.getElementById("experience").value;


    let user_records4 = new Array();
    user_records4 = JSON.parse(localStorage.getItem("users4")) ? JSON.parse(localStorage.getItem("users4")) : []

    user_records4.push({
        "facName": facName,
        "facImg": facImg,
        "facDeg": facDeg,
        "experience": experience
    })

    localStorage.setItem("users4", JSON.stringify(user_records4));

}


function saveTopicData(){
    let foldName = document.getElementById("foldName").value;
    let foldId = document.getElementById("foldId").value;
    let foldPrice = document.getElementById("foldPrice").value;

    let user_records1 = new Array();
    user_records1 = JSON.parse(localStorage.getItem("Topics")) ? JSON.parse(localStorage.getItem("Topics")) : []

    user_records1.push({
        "topicName": foldName,
        "topic_Id": foldId,
        "topicPrice": foldPrice
    })

    localStorage.setItem("Topics", JSON.stringify(user_records1));
    
}

function openSubTopic() {
    topicCount += 1;
    document.getElementById('editTopic').style.display = "none";
    document.getElementById('editSubTopic').style.display = "block";
}


function saveSubTopicData (){
    let subTopicfoldname = document.getElementById("subTopicfoldname").value;
    let subTopicfoldId = document.getElementById("subTopicfoldId").value;
    let subTopicfoldDes = document.getElementById("subTopicfoldDes").value;

    let user_records2 = new Array();
    user_records2 = JSON.parse(localStorage.getItem("SubTopics")) ? JSON.parse(localStorage.getItem("SubTopics")) : []

    user_records2.push({
        "subTopicName": subTopicfoldname,
        "subTopic_id": subTopicfoldId,
        "subTopicDescription": subTopicfoldDes
    })

    localStorage.setItem("SubTopics", JSON.stringify(user_records2));
    console.log(topicCount);

}

function saveAvailData() {
    document.getElementById('editFolder').style.display = "none";
    document.getElementById('editSubFold').style.display = "block";

    let availSubj, physics, topic1, topic2, topicTitle, description;
    availSubj = document.getElementById("availSubj").value;
    physics = document.getElementById("physics").value;
    topic1 = document.getElementById("topic1").value;
    topic2 = document.getElementById("topic2").value;
    topicTitle = document.getElementById("topicTitle").value;
    description = document.getElementById("description").value;


    let user_records5 = new Array();
    user_records5 = JSON.parse(localStorage.getItem("users5")) ? JSON.parse(localStorage.getItem("users5")) : []

    user_records5.push({
        "availSubj": availSubj
    })
    let user_records6 = new Array();
    user_records6 = JSON.parse(localStorage.getItem("users6")) ? JSON.parse(localStorage.getItem("users6")) : []

    user_records6.push({
        "physics": physics,
        "topic1": topic1,
        "topic2": topic2
    })

    let user_records7 = new Array();
    user_records7 = JSON.parse(localStorage.getItem("users7")) ? JSON.parse(localStorage.getItem("users7")) : []

    user_records7.push({
        "topicTitle": topicTitle,
        "description": description
    })

    localStorage.setItem("users5", JSON.stringify(user_records5));
    localStorage.setItem("users6", JSON.stringify(user_records6));
    localStorage.setItem("users7", JSON.stringify(user_records7));
}

function updateData() {

    let selectSub, selectTopic, blogPdf;
    selectSub = document.getElementsByClassName("selectSub").value;
    selectTopic = document.getElementsByClassName("selectTopic").value;
    blogPdf = document.getElementsByClassName("blogPdf").value;


    let user_records8 = new Array();
    user_records8 = JSON.parse(localStorage.getItem("users8")) ? JSON.parse(localStorage.getItem("users8")) : []

    user_records8.push({
        "selectSub": selectSub,
        "selectTopic": selectTopic,
        "blogPdf": blogPdf
    })

    localStorage.setItem("users8", JSON.stringify(user_records8));
}


function saveSubtopic() {
    document.getElementById('editSubFold').style.display = "none";
    document.getElementById('editSubtopic').style.display = "block";
}


function goToTopicFromSubTopic(){
    let subTopicData = JSON.parse(localStorage.getItem("SubTopics")) ? JSON.parse(localStorage.getItem("SubTopics")) : []
    let topicData = JSON.parse(localStorage.getItem("Topics"));

    console.log(topicCount);
    topicData[topicCount-1]["subTopics"] = subTopicData;
    console.log(topicData);
    localStorage.setItem("Topics", JSON.stringify(topicData));
    window.localStorage.removeItem('SubTopics');
    document.getElementById('editTopic').style.display = "block";
    document.getElementById('editSubTopic').style.display = "none";
}

const form1 = document.getElementById('editTopicform');
form1.addEventListener('submit', function handlerSubmit(event) {
    event.preventDefault();
    form1.reset();
});



const form2 = document.getElementById('editSubTopicform');
form2.addEventListener('submit', function handlerSubmit(event) {
    event.preventDefault();
    form1.reset();
});

const form3 = document.getElementById('editFolderform');
form3.addEventListener('submit', function handlerSubmit(event) {
    event.preventDefault();
    form1.reset();
});
const form4 = document.getElementById('editSubFoldform');
form4.addEventListener('submit', function handlerSubmit(event) {
    event.preventDefault();
    form1.reset();
});


const saveVimeoData=async()=>{
    let vimeoCourseData = JSON.parse(localStorage.getItem("Course"));
    let vimeoTopicsData = JSON.parse(localStorage.getItem("Topics"));
    vimeoCourseData.forEach(courseFolder=>{
        courseFolder['topics'] = vimeoTopicsData;
    })
    console.log(vimeoCourseData);

    let res = await fetch('/addVimeoVideoData',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vimeoCourseData)
    });
    const data = await res.json();
    if(data){
        window.alert("Video data stored successfully!");
        window.localStorage.clear();
        location.reload();
    }
    else{
        window.alert("Data not saved");
    }
} 