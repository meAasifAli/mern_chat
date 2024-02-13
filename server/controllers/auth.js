import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genTokenSetCookie from "../utils/genToken.js";


export const signupUser = async (req, res) => {
    try {
        const { username, fullname, gender } = req.body
        let { password } = req.body
        const userExists = await User.findOne({ username })

        if (userExists) {
            return res.status(400).json({ error: "User already exists" })
        }

        if (password) {
            const hash = await bcrypt.hash(password, 10)
            password = hash
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            username,
            fullname,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        await newUser.save()

        if (newUser) {
            genTokenSetCookie(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Signup" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({ error: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            genTokenSetCookie(user._id, res)
            res.status(200).json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                profilePic: user.profilePic
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Login" })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Logout" })
    }
}