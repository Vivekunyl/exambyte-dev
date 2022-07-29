//Code to send request to server for POST login

const form = document.getElementById('login-form');
form.addEventListener('submit', loginUser); //Adding Event listner to make Request to the server

/**
 * Fuction to send request to server for POST login and receiving Response
 * @param {event} e 
 * @async 
 */
async function loginUser(e) {
    e.preventDefault();
    /**
     * email
     * @type {string}
     */
    const email = document.getElementById('email').value;

    /**
     * password
     * @type {string}
     */
    const password = document.getElementById('password').value;

    /**
     * handling HTTP response from /login
     * @method POST
     * @headers {Object}
     * @body {string}
     */
    const result = await fetch('/loginSuperAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    /**
     * awaitng HTTP response from server
     */
    const data = await result.json();
    /**
     * checking HTTP response from server
     */

    if (data.status === 'admin') {
        location.assign('/adminPanel'); //Login successfull and directing to Home page
    } else {
        alert('Invalid Credentials!');
    }

    console.log(result);
}