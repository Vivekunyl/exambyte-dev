/**
 * Getting properties of DOM elements
 */
const formFields = document.querySelector('form'); //Getting Form property

const name_error = document.querySelector('.form-name');
const email_error = document.querySelector('.form-email');
const password_error = document.querySelector('.form-password');
const confirm_password_error = document.querySelector('.form-cpassword');

//Adding Event Listener on submit Button
formFields.addEventListener('submit', async (e) => {
    e.preventDefault();

    // getting values of Form input fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contactNo').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    console.log(name, email)//Testing Purpose
    try {
        /**
         * @method POST
         * @header {Object}
         * @body {String}
         */
        const res = await fetch('/register', {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                contactNo,
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
            location.assign('/login'); //Successfully Login
        } else {
            window.alert('Please enter valid Details')
        }

    } catch (err) {
        console.log(err);
    }

})

































// const form = document.getElementById('reg-form');
// form.addEventListener('submit', registerUser);

// async function registerUser(e) {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const password = document.getElementById('password').value;
//     const cpassword = document.getElementById('cpassword').value;

//     const result = await fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name, email, phone, password, cpassword })
//     }).then((res) => { res.json() });

//     if (result === 'ok') {
//         alert('Success');
//     }
//     else {
//         alert('registration failed');
//     }

//     console.log(result);
// }