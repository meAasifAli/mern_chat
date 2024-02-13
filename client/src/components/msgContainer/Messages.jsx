import { useEffect, useRef, useState } from 'react';
import Message from './Message'
import useConversation from '../../zustand/useConversation';
import axios from 'axios'
import useListenMessages from '../../hooks/useListenMessages';
const Messages = () => {
    useListenMessages()
    const lastMessageRef = useRef();

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://mern-chat-app-b8mn.onrender.com/api/messages/${selectedConversation._id}`);
                setMessages(res?.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages?.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {!loading && messages?.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    )
}
export default Messages