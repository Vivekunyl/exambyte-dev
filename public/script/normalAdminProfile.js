const displayAdminAllBlogsSection = document.getElementById('show-admin-all-blogs');
const editBlogSection = document.getElementById('edit-blog-section');
const formFields = document.querySelector('form');
const show_admin_all_tests_section = document.getElementById('show-admin-all-tests');


//Function to redirect admin to add blog Section

/**
 * 
 * @param {String} id 
 */
const displayCreateBlogSection = (id) => {
    location.assign(`/addBlog/${id}`);
}





const displayShowTestSection = async (id) => {
    try {
        const res = await fetch(`/getAdminTest/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        const data = await res.json();
        if (data) {
            editBlogSection.style.display = 'none';
            displayAdminAllBlogsSection.style.display = 'none';
            let display = window.getComputedStyle(show_admin_all_tests_section).display;
            if (display === 'none') {
                show_admin_all_tests_section.innerHTML="";
                show_admin_all_tests_section.style.display = 'flex';
                for (let i = 0; i < data.length; i++) {
                    show_admin_all_tests_section.innerHTML += `
                        <div class="test-detail">
                            <div class="admin-test-title">
                                <p>${data[i].title}</p>
                            </div>
                            <div class="admin-test-date">
                                <p>Created at:&nbsp${data[i].createdAt}</p>
                            </div>
                            <div class="admin-test-questionCount">
                                <p>No. Of Questions:&nbsp${data[i].noOfQestions}</p>
                            </div>
                            <div class="admin-test-link">
                                <a href="http://localhost:2000/mcq/${data[i].slug}" target="_blank">Link to Test</a>
                            </div>
                            <div class="admin-test-actions">
                                <button onclick="deleteTest('${data[i]._id}')">Delete</button>
                            </div>
                        </div>

                    `
                }

            }
        }
    } catch (err) {
        console.log(err);
    }
}


const deleteTest = async (id) => {
    try {
        const res = await fetch(`/deleteTest/${id}`, {
            method: 'DELETE',
            headers: {
                'contentType': 'application/json'
            }
        });
        const data = await res.json();

        if (data.message === 'Test deleted') {
            alert('Test deleted successfully');
            location.assign('/normalAdminProfile');
        }
        else {
            alert("Can't perform the action");
        }
    } catch (err) {
        console.log(err);
    }
}




//Function to Display all the Blogs creted by user
/**
 * 
 * @param {String} id
 * @async 
 */
const displayShowBlogSection = async (id) => {

    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch(`/showAdminAllBlogs/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            show_admin_all_tests_section.style.display = 'none';
            editBlogSection.style.display = 'none';
            let display = window.getComputedStyle(displayAdminAllBlogsSection).display;
            if (display === 'none') {
                displayAdminAllBlogsSection.innerHTML="";
                displayAdminAllBlogsSection.style.display = 'flex';
                //Displaying data dynamically
                for (let i = 0; i < data.length; i++) {
                    let blogData = `
                            <div id="blog-data-section" class="blog-data-section-class">
                                <div class="blog-content">
                                    <h2>${data[i].title}</h2>
                                    <p>${data[i].description.substring(0, 100)}....</p>
                                </div>
                                <div class="blog-actions">
                                    <div class="blog-actions-edit">
                                        <a href="javascript:;" class='fas fa-pen' onclick="editBlog('${id}','${data[i]._id}','${i}')">&nbspEdit</a>
                                    </div>
                                    <div class="blog-actions-delete">
                                        <a href="javascript:;" class='fas fa-trash' onclick="deleteBlog('${data[i]._id}')">&nbspDelete</a>
                                    </div>
                                </div>
                            </div>
                        `
                    displayAdminAllBlogsSection.innerHTML += blogData;
                }
            }

        }
    } catch (err) {
        console.log(err);
    }

}

//Function to get Admin data and display it dinamically
/**
 * @async 
 */
const getAdminData = async () => {
    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch('/getNormalAdminDetails', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();

        if (data) {
            document.getElementById('name').innerHTML = data.name;
            document.getElementById('email').innerHTML = data.email;
            let blogButtons = `
                <a href="javascript:;" class="fa fa-file-text-o navigation-btns" onclick="displayCreateBlogSection('${data._id}')" >&nbspCreate a new blog</a>
                <a href="javascript:;"  class='fas fa-eye navigation-btns' onclick="displayShowBlogSection('${data._id}')">&nbspShow my blogs</a>
                <a href="javascript:;" class='fas fa-book-open navigation-btns' onclick="displayShowTestSection('${data._id}')">&nbspMy created Tests</a>
            `;
            document.getElementById('button-section').innerHTML = blogButtons;
            document.getElementById('nav-link-3').innerHTML = `
                <a class="nav-link" href="javascript:;" onclick="displayCreateBlogSection('${data._id}')">Create Blog</a>
            `
            displayShowBlogSection(data._id);
        }
    } catch (err) {
        console.log(err);
    }
};

getAdminData(); //calling function to display admin data

/**
 * Function to fill input fields with existing Data
 * @param {String} adminId 
 * @param {Number} i 
 * @async
 */
const fillInputfields = async (adminId, i) => {
    try {
        const res = await fetch(`/showAdminAllBlogs/${adminId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            console.log(data[i]);
            formFields.title.value = data[i].title;
            formFields.description.value = data[i].description;
            formFields.markdown.value = data[i].markdown;
            formFields.category.value = data[i].category;
        }

    } catch (err) {
        console.log(err);
    }
}

//Function to edit Blog posts

/**
 * 
 * @param {String} adminId 
 * @param {String} blogId 
 * @param {Number} i 
 * @async 
 */
const editBlog = async (adminId, blogId, i) => {
    displayAdminAllBlogsSection.style.display = 'none';
    editBlogSection.style.display = 'block';
    fillInputfields(adminId, i);
    formFields.addEventListener('submit', async (e) => {
        e.preventDefault();

        // get values 
        const title = formFields.title.value;
        const description = formFields.description.value;
        const markdown = formFields.markdown.value;
        const images = formFields.file.files;
        const category = formFields.category.value;


        try {
            /**
             * @method PUT
             * @body {String}
             * @headers {Object}
             */
            const res = await fetch(`/updateBlog/${blogId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    description,
                    markdown,
                    images,
                    category,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json(); //Getting Response from the server
            if (data) {
                alert('blog updated successfully');
                location.assign('/NormalAdminDashboard');
            } else {
                alert('Failed to update blog');
            }

        } catch (err) {
            console.log(err);
        }
    });
}

//Function to delete a particular blog

/**
 * 
 * @param {String} blogId 
 * @async 
 */
const deleteBlog = async (blogId) => {
    if (confirm('Are you sure you want to delete this blog ?')) {
        try {
            const res = await fetch(`/deleteBlog/${blogId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            if (data.message === 'Blog deleted') {
                alert("Blog deleted successfully!");
                location.assign('/NormalAdminDashboard');
            }

        } catch (err) {
            console.log(err);
        }

    }

}