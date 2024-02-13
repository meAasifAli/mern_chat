import { userAuthprovider } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { format } from 'date-fns'
const Message = ({ message }) => {
    const { selectedConversation } = useConversation()
    const { authUser } = userAuthprovider()
    const fromMe = message?.senderId === authUser?._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message?.shouldShake ? "shake" : ""
    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}  pb-2`}>{message?.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{format(new Date(message?.createdAt), "p")}</div>
        </div>
    )
}
export default Message