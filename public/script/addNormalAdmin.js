/**
 * Getting properties of DOM elements
 */
const formFields = document.querySelector('form'); //Getting Form property

const name_error = document.querySelector('.form-name');
const email_error = document.querySelector('.form-email');
const password_error = document.querySelector('.form-password');
const confirm_password_error = document.querySelector('.form-cpassword');

//Adding Event Listener on submit Button
formFields.addEventListener('submit', async(e) => {
    e.preventDefault();

    // getting values of Form input fields
    const name = formFields.name.value;
    const email = formFields.email.value;
    const contactNo = formFields.contactNo.value;
    const gender = formFields.gender.value;
    const subject = formFields.subject.value;
    const password = formFields.password.value;
    const confirm_password = formFields.confirm_password.value;
    // console.log(name, email) //Testing Purpose
    try {
        /**
         * @method POST
         * @header Object
         * @body String
         */
        const res = await fetch('/registerNormalAdmin', {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                contactNo,
                gender,
                subject,
                password,
                confirm_password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json(); //Getting Response from the server
        console.log(data); //For testing Purpose
        if (res.status === 201) {
            location.assign('/SuperAdminDashboard'); //Successfully Login
        } else {
            window.alert('Please enter valid Details')
        }

    } catch (err) {
        console.log(err);
    }

})