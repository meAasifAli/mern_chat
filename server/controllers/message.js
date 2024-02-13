import Conversation from "../models/Conversation.js";
import Message from '../models/Message.js'
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, img } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        //first we will  check if we have existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        //if there is no conversation a new conversation will be created
        if (!conversation) {
            conversation = Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            img
        })

        if (newMessage) {
            conversation?.messages?.push(newMessage)

        }
        await Promise.all([
            newMessage.save(),
            conversation.save()
        ])

        //Socket
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Fetching Conversation" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: otherUserId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({ participants: { $all: [senderId, otherUserId] } }).populate("messages")
        if (!conversation) return res.status(200).json([]);
        const messages = conversation?.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}