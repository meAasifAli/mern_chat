import User from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcryptjs'




export const getOtherUsers = async (req, res) => {
    try {
        const currUser = req.user._id
        const allUsers = await User.find({})

        const otherUsers = allUsers.filter(user => user._id.toString() !== currUser.toString())

        res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Fetching Conversation" });
    }
}

