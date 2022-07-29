const formFields = document.querySelector('form');

//function to create a blog Post 

/**
 * Function to send a request to save a blog post to the server
 * @param {String} id 
 */
const postBlog = async(id) => {
    formFields.addEventListener('submit', async(e) => {
        e.preventDefault();
        const richtext = document.getElementById('richtext');
        // get values 
        const title = formFields.title.value;
        const description = formFields.description.value;
        const blogContent = richtext.contentWindow.document.body.innerHTML;
        const markdown = formFields.markdown.value;
        const images = formFields.file.files
        const category = formFields.category.value;
        console.log('in blog script')

        console.log(blogContent)
        const formData = new FormData(document.getElementById("form"));
        // console.log(formData.blogContent)

        try {
            const res = await fetch(`/addBlog/${id}`, {
                method: 'POST',
                body: formData
            })

            const url = await res.url;
            // console.log(url)
            location.assign(url)
        } catch (err) {
            console.log(err);
        }
    })
}

//function to get admin id
/**
 * @async
 */
const getAdminId = async() => {

    try {
        const res = await fetch('/getNormalAdminDetails', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();

        if (data) {
            postBlog(data._id);
            // localStorage.setItem('admin_id', JSON.stringify(data._id));
        }

    } catch (err) {

    }
};

getAdminId(); //Calling the function to get the admin id from database

function enableEditMode() {
    console.log('hiiii');
    richTextField.document.designMode = 'on';
}

function execCmd(cmd) {
    richTextField.document.execCommand(cmd, false, null);
}

function execCmdWithArg(cmd, arg) {
    richTextField.document.execCommand(cmd, false, arg);
}