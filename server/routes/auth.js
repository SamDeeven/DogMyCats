const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


router.post('/signup', (req, res) => {
    const { name, email, city, password } = req.body
    if (!name || !email || !city || !password) {
        res.status(422).json({ error: "Please add all fields" })
    }

    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with this Email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name,
                        city,
                        email,
                        password: hashedPassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "Successfully Signed up" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
})




router.post("/signin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "Please add all fields" })
    }
    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid username or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(ifMatched => {
                    if (ifMatched) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        res.json({
                            message: "Successfully Signed in",
                            token
                        })
                    } else {
                        return res.status(422).json({ error: "Invalid username or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })

})








module.exports = router