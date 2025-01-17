import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";


/**
 * @desc get users for sidebar
 * @Route /api/messages/users
 * @method get
 * @access private (required user token) 
*/
export const getUserForSideBarController = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error get user for sidebar: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


/**
 * @desc get message between users
 * @Route /api/messages/:id
 * @method get
 * @access private (required user token) 
*/
export const getMessagesController = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const message = await Message.find({
            $or: [
                {
                    senderId: senderId,
                    receiverId: receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: senderId
                }
            ]
        });

        res.status(200).json(message);
    } catch (error) {
        console.log("Error get user for sidebar: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


/**
 * @desc send message
 * @Route /api/messages/send/:id
 * @method post
 * @access private (required user token) 
*/
export const sendMessageController = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl
        });

        await newMessage.save();

        //@TODO realtim fucntion (socket.io)

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error get user for sidebar: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}