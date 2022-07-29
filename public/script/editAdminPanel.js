const formFields = document.getElementById('edit-admin');
const url = document.location.href;
console.log(url);
const displayData=async()=>{
    try {
        const res = await fetch('/getAllData', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });

        const data = await res.json();
    }catch (err){
        console.log(err);
    }
}

formFields.addEventListener('submit', async (e) => {
    e.preventDefault();

    // getting values of Form input fields
    const name = document.getElementById('name').value;
    const contactNo = document.getElementById('contactNo').value;

    console.log(name, contactNo)//Testing Purpose
    try {
        /**
         * @method POST
         * @header JSON
         * @body String
         */
        const res = await fetch('/register', {
            method: "POST",
            body: JSON.stringify({
                name,
                contactNo
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json(); //Getting Response from the server
        console.log(data); //For testing Purpose
        if (res.status === 201) {
            location.assign('/login'); //Successfully Login
        } else {
            window.alert('Please enter valid Details')
        }

    } catch (err) {
        console.log(err);
    }

})