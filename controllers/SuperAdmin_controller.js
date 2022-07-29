/**
 * @file This file inside controllers has function definitions for Super Admin Features 
 */

const superAdmin = require('../models/superAdminSchema'); //acquiring Schema for admin model
const Admin = require('../models/normalAdmin'); //acquiring Schema for admin model
const bcrypt = require('bcryptjs');

//....................Implementing Signup Part..............................................


/**
 * Function to GET request for rendering HTML for Signup page
 * @module SuperAdmin_register_get
 * @name get/register
 * @param {String} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {register.ejs} res 
 * @exports superAdmin_register_get
 */
exports.register_get = (req, res) => {
    res.render('addSuperadmin');
}

/**
 * Function to POST request for Register if userregistered successfully server will send of status code 201
 * else a status code of 404 will be send
 * @module SuperAdmin_register_post
 * @param {Object} req 
 * @param {Number} res 
 * @returns {Number} status code
 * @exports SuperAdmin_register_post
 */
exports.register_post = async(req, res) => {
    console.log(req.body);
    const { name, email, contactNo, password, confirm_password } = req.body;
    if (!name || !email || !contactNo || !password || !confirm_password) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    } else if (password.length < 6) {
        return res.status(401).json({ error: "Password must be at least 6 characters" })
    }
    try {
        /**
         * Searching if a user already exist with the email
         */

        // normal usersection
        const dbEmail = await superAdmin.findOne({ email: email });

        if (dbEmail) {
            return res.status(404).json({ error: 'Email Already Registered' })
        }
        if (password === confirm_password) {

            const detail = new superAdmin({
                name,
                email,
                contactNo,
                password
            });

            console.log(detail) //For testing purpose
            console.log('here')
            const registered = await detail.save();

            if (registered) {
                res.status(201).json({ registered: registered._id });
            } else {
                res.status(500).json({ error: "User Failed to Register" });
            }

        } else {
            res.status(404).json({ error: 'Enter same confirm password' })
        }
    } catch (error) {
        res.status(404).json({ error: error });
    }
}



//.....................Implementing Login Part...............................................


/**
 * Function to GET request for rendering HTML for login page
 * @module SuperAdmin_login_get
 * @name get/login
 * @param {string} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {login.ejs} res 
 * @exports SuperAdmin_login_get
 */
exports.login_get = (req, res) => {
    res.render('loginSuperadmin');
}

/**
 * Function to POST request for validating login and if user is verified a response 'ok' will be send to
 * client otherwise a status code '400' will be send to client.
 * @module SuperAdmin_login_post
 * @param {Object} req 
 * @param {Number} res 
 * @param {callback} middleware
 * @returns {number}a status code of '400' when input fields are not filled
 * @async 
 * @exports SuperAdmin_login_post
 */

exports.login_post = async(req, res) => {
    try {
        /**
         * object destructuring to get email and password from client
         */

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }
        /**
         * Storing user data if user exists in database 
         */

        const Adminsearch = await superAdmin.findOne({ email: email });
        if (!Adminsearch) {
            res.status(400).json({ error: "admin not found" });
        } else {
            const isValidlogin = await bcrypt.compare(password, Adminsearch.password);
            const token = await Adminsearch.generateAuthToken();
            console.log(token); //for testing pupose 
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 60480000), //expiry data of token set for 1 week
                httpOnly: true
            });

            if (!isValidlogin) {
                res.status(400).json({ error: "admin not found" });
            } else {
                console.log('admin found'); //For testing purpose in backend
                res.status(200).json({ status: 'admin' });
            }
        }

    } catch (err) {
        console.log(err);
    };
}


//.....................Implementing Super Admin panel Part...............................................

/**
 * Function to render Super Admin panel HTML, CSS , javascript files 
 * @module get_superadmin_panel
 * @param {*} req 
 * @param {adminPanel.ejs} res 
 * @exports get_superadmin_panel
 */
exports.get_admin_panel = (req, res) => {
    res.render('adminPanel');
}


/**
 * Function to send Super Admin details to a client in form of Qbject
 * @module get_admin_data
 * @param {Object} req 
 * @param {Object} res 
 * @exports get_admin_data
 */
exports.get_admin_data = (req, res) => {
    res.send(req.verifiedAdmin);
}

//.....................Implementing CRUD operations on admins part...............................................



/**
 * Function to Create a Normal Admin user and add it to NORMALADMINDATA collection
 * @module create_admin
 * @param {Object} req 
 * @param {Number|Object} res 
 * @returns {Number}
 * @async 
 * @exports create_admin
 */
exports.create_admin = async(req, res) => {
    console.log(req.body);
    const { name, email, contactNo, gender, subject, password, confirm_password } = req.body;
    if (!name || !email || !contactNo || !gender || !subject || !password || !confirm_password) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    } else if (password.length < 6) {
        return res.status(401).json({ error: "Password must be at least 6 characters" })
    }
    console.log('create normal admin section')
    try {
        /**
         * Searching if a user already exist with the email
         */

        // normal usersection
        const dbEmail = await Admin.findOne({ email: email });

        if (dbEmail) {
            return res.status(404).json({ error: 'Email Already Registered' })
        }
        if (password === confirm_password) {

            const detail = new Admin({
                name,
                email,
                contactNo,
                gender,
                subject,
                password
            });

            console.log(detail) //For testing purpose
            console.log('here')
            const registered = await detail.save();

            if (registered) {
                res.status(201).json({ registered: registered._id });
            } else {
                res.status(500).json({ error: "User Failed to Register" });
            }

        } else {
            res.status(404).json({ error: 'Enter same confirm password' });
        }
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

/**
 * Function to get all Admins data to show in a table 
 * @module getAllDocuments
 * @param {*} req 
 * @param {Array} res 
 * @async 
 * @exports getAllDocuments
 */
exports.getAllDocuments = (req, res) => {
    Admin.find().then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
}


/**
 * Function to Update admin data
 * @module update_admin_data_put
 * @param {_id} req 
 * @param {Number|Object} res 
 * @exports update_admin_data_put
 */
exports.update_admin_data_put = (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!req.body) {
        res.status(400).send({ message: "Data might not be filled" });
    }
    Admin.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "can not update user" });
            } else {
                res.status('ok').send(data);
            }
        }).catch(err => {
            res.status(500).send({ message: "cabn not update data" });
        })
}


/**
 * Function to get a particular admin data to show in input field for editing
 * @module edit_admin_data_get
 * @param {_id} req 
 * @param {Object} res 
 * @exports edit_admin_data_get
 */
exports.edit_admin_data_get = (req, res) => {
    const id = req.params.id;
    Admin.findById(id).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
}


/**
 * Function to DELETE a particular admin using it's ID
 * @module delete_admin_data
 * @param {_id} req 
 * @param {Number|String} res 
 * @exports delete_admin_data
 */
exports.delete_admin_data = (req, res) => {
    const id = req.params.id;
    Admin.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: "can't delete'" });
        } else {
            res.send({ message: "User deleted" });
        }
    }).catch(err => {
        res.status(500).send({ message: err });
    })
}

//...................................Implemnting Vimeo Video controls............................

exports.get_vimeoControl = (req,res)=>{
    res.render('vimeo_control');
}

exports.post_facultyData = async (req,res)=>{
    const data = req.body;
    console.log(data);
    const FacultyData = new Faculty(data);
    try{
        const dataResponse = await FacultyData.save();
        if(dataResponse){
            res.status(200).json(dataResponse);
        }
    }catch(error){
        console.log(error);
    }
}

//.....................Implementing Logout Part...............................................

/**
 * GET request to logout the user
 * @module superAdmin_logout_get
 * @param {*} req 
 * @param {Number} res 
 * @exports superAdmin_logout_get
 */
exports.adminLogout_get = (req, res) => {
    res.clearCookie('jwtoken');
    res.status(200).redirect('/loginSuperAdmin');
}