// import express from 'express';
// import bcrypt from 'bcrypt';
// const router = express.Router();
// import { User } from '../models/User.models.js';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

// router.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.json({ message: "User already exists" });
//         }

//         // Hash the password
//         const hashPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
//             username,
//             email,
//             password: hashPassword,
//         });

//         // Save the new user to the database
//         await newUser.save();

//         // Return success message
//         return res.json({ status: true, message: "Record Registered" });
//     } catch (error) {
//         // Handle any errors
//         console.error("Error registering user:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email })
//     if (!user) {
//         return res.json({ message: "User is not registered" })
//     }
//     const validPassword = await bcrypt.compare(password, user.password)
//     if (!validPassword) {
//         return res.json({ message: "password is incorrect" })
//     }
//     const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
//     res.cookie('token', token, { httpOnly: true, maxAge: 3600 })
//     return res.json({ status: true, message: "login success" })
// })

// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.json({ message: "User not registered" })
//         }
//         var nodemailer = require('nodemailer');


//         const token = jwt.sign({ id: user.id }, process.env.KEY, { expiresIn: '10m' })

//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'the.shareef.sahil001@gmail.com',
//                 pass: 'aaeq ohve mimv ghit'
//             }
//         });

//         var mailOptions = {
//             from: 'the.shareef.sahil001@gmail.com',
//             to: email,
//             subject: 'Reset password',
//             text: `http://localhost:5173/resetPassword/${token}`
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 return res.json({ status: false, message: "email not sent" });
//             } else {
//                 return res.json({ status: true, message: "email sent" });
//             }
//         });
//     } catch (err) {
//         console.log(err)
//     }
// })



// const verifyUser = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.json({ status: false, message: "No token" });
//         }
//         const decoded = await jwt.verify(token, process.env.KEY);
//         // Add decoded user information to the request object
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.json({ status: false, message: "Invalid token" });
//     }
// };


// // Now you can use verifyUser in your route definition
// router.get('/verify', verifyUser, (req, res) => {
//     return res.json({ status: true, message: "authorized" });
// });

// router.get('/logout', (req, res) => {
//     res.clearCookie('token')
//     return res.json({status: true})
// })
// export { router as UserRouter };

import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.models.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        await newUser.save();

        return res.json({ status: true, message: "Record Registered" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not registered" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds (1 hour)
        return res.json({ status: true, message: "Login success" });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/forgot-password', async (req, res) => {
    // Implementation for forgot password functionality
});

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "No token" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        // Add decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.json({ status: false, message: "Invalid token" });
    }
};

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "Authorized" });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});

export { router as UserRouter };
