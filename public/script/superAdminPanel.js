const display_table = document.getElementById("display-table");
const admin_edit_form = document.getElementById("edit-admin");
const display_name = document.getElementById('display-name');
const display_contactNo = document.getElementById('display-contactNo');
const display_email = document.getElementById('display-email');
const display_subject = document.getElementById('display-subject');
const display_gender = document.getElementById('display-gender');
const addAdminPanel = document.getElementById('addAdmin');
const show_admins_data = document.getElementById('show-admins-data');
const superAdminControlButtons = document.getElementById('admin-control-button');
const formFields = document.getElementById('add-admin-form');

//....................Function to add admin to database.............................

/**
 * Function to add admin user to database
 * @async 
 */
formFields.addEventListener('submit', async(e) => {
    e.preventDefault();

    // getting values of Form input fields
    const name = formFields.name.value;
    const email = formFields.email.value;
    const contactNo = formFields.contactNo.value;
    const gender = formFields.gender.value;
    const subject = formFields.subject.value;
    // const role = formFields.role.value;
    const password = formFields.password.value;
    const confirm_password = formFields.confirm_password.value;
    // console.log(name, email) //Testing Purpose
    try {
        /**
         * @method POST
         * @header {Object}
         * @body {String}
         */
        const res = await fetch('/createAdmin', {
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
            window.alert("Admin added successfully"); //Successfully Login
            location.assign('/adminPanel');
        } else {
            window.alert('Please enter valid Details')
        }

    } catch (err) {
        console.log(err);
    }

})




//.........................Function to display Admin info at the Admin editing time.............................

/**
 * Function to put the existiong admin values to the respective input fields
 * @param {String} id 
 * @async 
 */
const displayData = async(id) => {
    try {
        /**
         * @method GET
         * @headers{Object}
         */
        const res = await fetch(`/editAdmin/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });

        const data = await res.json();
        console.log(data);
        display_name.value = data.name;
        display_contactNo.value = data.contactNo;
        display_email.value = data.email;
        display_subject.value = data.subject;
        display_gender.value = data.gender;
    } catch (err) {
        console.log(err);
    }
}


//........................Function to edit the data of an admin....................................

/**
 * Function to edit the data of an admin
 * @param {String} id 
 */
function editAdmin(id) {
    admin_edit_form.style.display = "block";
    display_table.style.display = "none";
    displayData(id);
    admin_edit_form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const name = document.getElementById('display-name').value;
        const contactNo = document.getElementById('display-contactNo').value;
        const email = document.getElementById('display-email').value;
        const subject = document.getElementById('display-subject').value;
        const gender = document.getElementById('display-gender').value;
        console.log(`${name} and ${contactNo}`); //Testing Purpose
        try {
            /**
             * @method PUT
             * @header {Object}
             * @body {String}
             */
            console.log(`/updateAdmin/${id}`);
            const res = await fetch(`/updateAdmin/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name,
                    contactNo,
                    email,
                    subject,
                    gender
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json(); //Getting Response from the server
            console.log(data); //For testing Purpose
            if (data) {
                alert("Successfully updated the data!");
                location.assign("/adminPanel");
            } else {
                alert("Error updating the data!");
            }

        } catch (err) {
            console.log(err);
        }
    });

}


//..............................Function to delete the admin data...................................

/**
 * Function to DELETE the admin data
 * @param {String} id 
 * @async 
 */
const deleteAdmin = async(id) => {
    if (confirm('Are you sure you want to delete the Admin?')) {

        try {
            /**
             * @method DELETE
             * @headers {Object}
             */
            const res = await fetch(`/deleteAdmin/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json(); //Getting Response from the server
            console.log(data); //For testing Purpose
            console.log(data.message);
            if (data.message === 'User deleted') {
                alert("admin deleted successfully!");
                location.assign('/adminPanel');
            }
        } catch (err) {
            console.log(err);
        }
    }

}


//..............Function to show the list of admins to the super admin panel....................

/**
 * Function to receive data from backend 
 * @async 
 */
const getAllData = async() => {
    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch('/getAllData', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            console.log(data.length);
            const table = document.getElementById('mytable');
            //Printing table dynamically
            for (let i = 0; i < data.length; i++) {
                let row = `<tr>
                                <td>${data[i].name}</td>
                                <td>${data[i].email}</td>
                                <td>${data[i].contactNo}</td>
                                <td>${data[i].subject}</td>
                                <td>${data[i].gender}</td>
                                <td><button onclick="editAdmin('${data[i]._id}')">Edit</button> <button onclick="deleteAdmin('${data[i]._id}')">Delete</button></td>
                                
                          </tr> `
                table.innerHTML += row;
            }
        }

    } catch (err) {
        getDisplayNone();
        console.log(err);
    }
}

//Function to make display none for logout when super admin  is not authorised
const getDisplayNone = () => {
    document.getElementById('logout').style.display = "none";
}

//Function to make display inline when super admin is  authorised
const getDisplay = () => {
    document.getElementById('logout').style.display = "inline";
}

//Function to show add admin panel 
const showAddAdminPanel = () => {
    show_admins_data.style.display = "none";
    addAdminPanel.style.display = "flex";
}

//Function to show admin Detail panel
const showAdminDetailPanel = () => {
    show_admins_data.style.display = "flex";
    addAdminPanel.style.display = "none";
}


//Function to logout the Super admin

const getLogout = () => {
    location.assign('/logoutSuperAdmin');
}





//.....................Function to show the admin details..................................

/**
 * Function to show the Super admin details
 * @async 
 */
const adminPanel = async() => {
    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch('/getAdminData', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });

        const data = await res.json();
        if (data) {
            console.log(data);
            getDisplay();
            document.getElementById('name').innerHTML = `HI ${data.name}`;
            document.getElementById('email').innerHTML = `Your Email: ${data.email}`;

            let buttons = `
                            <div class="add-btn text-center col-xs-7 py-3 pt-2">
                            <div class="offset-1 col-xs-6">
                                <button class="btn" onclick="showAddAdminPanel()">Add Faculty/Admin</button>
                                <button class="btn" onclick="showAdminDetailPanel()" >Show Faculty/Admin</button>
                            </div>
                            </div>
                        
            `
            superAdminControlButtons.innerHTML = buttons;
            getAllData();
        }

    } catch (err) {
        getDisplayNone();
        console.log(err);
    }
}

adminPanel(); //Calling function to show the data