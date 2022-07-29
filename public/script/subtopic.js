
const makePayment = async (id) => {
    try{
        const res = await fetch(`/payment/${id}` , {
            method: "GET",
            contentType: "application/json"
        })

        const data = await res.json;
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}


var toggleExtras = document.querySelectorAll('.subtopic');

Array.prototype.forEach.call(toggleExtras, function (toggleExtra, index) {
    toggleExtra.addEventListener('click', function () {
        makePayment(toggleExtra.id)
    })
});

