const quizChart = document.getElementById('topicIqChart').getContext('2d');
const heighestScore = document.getElementById('heigest-score');

const getUserQuizData = async (userId)=>{
    try{
        const res = await fetch(`/userQuizData/${userId}`,{
            method:'GET',
            contentType:'application/json'
        });
        
        const data = await res.json();
        if(data){
            console.log(data);
            let labeldata=[]; //Array for labels of graph
            let marksdata=[]; //Array for marks data in graph
            
            data.userQuizes.forEach(element=>{
                marksdata.push(element.marksScored);
                labeldata.push(`${element.test.title}`);
            })
            
            let highScore = Math.max(...marksdata); //variable to show highest Score

            heighestScore.innerHTML = highScore;

            const myChart = new Chart(quizChart,{
                type:'radar',
                data:{
                    labels:  labeldata,
                    datasets: [{
                        label: 'Quiz Stats',
                        data: marksdata,
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                      }]
                }
            });

        }
    }catch(err){
        console.log(err);
    }
}