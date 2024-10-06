const express = require('express');
const mongoose = require('mongoose');

const config = require('./Config/config').get(process.env.NODE_ENV);

const cors = require('cors');

// Dotenv configuration
require('dotenv').config();

const app = express();

// Cors Middleware
app.use(cors({ origin: true, credentials: true }));

// Middlewares

// Body parser Middleware
app.use(express.json());
// Url Encoded
app.use(express.urlencoded({ extended: false }));

// External API


//// ================ Authentication Route ================ ////

// Get info from Server
app.use('/auth/read', require('./Routes/Auth_api/Get/index'));

// Add/Post info to server
app.use('/auth/edit', require('./Routes/Auth_api/Post/index'));

// Delete User Info
app.use('/auth', require('./Routes/Auth_api/Delete/index'));

//// ================ End Of Authentication Route ================ ////


//                             END                                 //
//  --------------------------------------------------------------- //
//                             END                                   //


//// ================ Friends List Route ================ ////

// Get Methods Friends_api
app.use('/friends/get', require('./Routes/Friends_api/Get/index'))

// Post Methods Friends_api
app.use('/friends/post', require('./Routes/Friends_api/Post'))

//// ================ End Of Friends List Route ================ ////

//                             END                                 //
//  --------------------------------------------------------------- //
//                             END                                   //

/// ================= Profile Posting Route ===================== ////

// Post Methods for Profile Image
app.use("/profile", require('./Routes/Profile/post'));

// Get Methods for Profile Image
app.use("/profile", require('./Routes/Profile/get'));


/// ================= End of Profile Posting Route ===================== ////


//                             END                                 //
//  --------------------------------------------------------------- //
//                             END                                   //


/// ======================= User Posts Routes ========================== ///

// Post Methods for The User Posts
app.use('/post', require('./Routes/Posts/post'));

// Get Methods for the Users Posts
app.use('/post', require('./Routes/Posts/get'));

// Delete Methods for the Users Posts
app.use('/post', require('./Routes/Posts/delete'));

/// ===================== End of User Posts, posting Routes ======================== ///


//                             END                                 //
//  --------------------------------------------------------------- //
//                             END                                   //


/// ========================== Users Status Routes ============================= ///

// Post Methods for the Status posts
app.use('/status', require('./Routes/Status/post'));

// Get Methods for the Status posts
app.use('/status', require('./Routes/Status/get'));

// Delete Methods for the Status posts
app.use('/status', require('./Routes/Status/delete'));


/// ======================== End of Users Followers and following Routes =========================== ///

/// ========================== Users Followers and Following Routes ============================= ///

// Post Methods for the Status posts
app.use('/follow', require('./Routes/Follow/post'));

// Get Methods for the Status posts
app.use('/follow', require('./Routes/Follow/get'));

/// ======================== End of Users Followers and Following Routes =========================== ///


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.get('/', (req, res) => {
    res.send("This is absolutly working")
})

app.post('/app', (req, res) => {
    res.status(200).send(req.body)
})

const port = process.env.PORT || 3004;

app.listen(port, () => console.log(`Server running ${port}`))
