import { BsSend } from 'react-icons/bs'
import axios from 'axios'
import { useState } from 'react'
const MessageInput = ({ selectedConversation }) => {
    const [loading, setloading] = useState(false)
    const [message, setMessage] = useState("")
    const handleSendMessage = async (ev) => {
        ev.preventDefault()
        setloading(true)
        // prevent page reloading
        try {
            const res = await axios.post(`http://localhost:9000/api/messages/send/${selectedConversation._id}`, {
                message
            })
            if (res.status === 201) {
                setMessage("")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setloading(false)
        }
    }
    return (
        <form onSubmit={handleSendMessage} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {
                        loading ? <span className='loading loading-spinner'></span> : <BsSend />
                    }
                </button>
            </div>
        </form>
    )
}
export default MessageInput