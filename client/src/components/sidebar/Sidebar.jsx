import Conversations from "./Conversations"
import SearchInput from "./SearchInput"
import LogoutButton from "./LogoutButton"
import { useEffect, useState } from "react"
import axios from 'axios'


const Sidebar = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    useEffect(() => {
        setLoading(true)
        const getConversations = async () => {
            try {
                const res = await axios.get("https://mern-chat-app-b8mn.onrender.com/api/users")
                // const data = await res.json()
                setConversations(res?.data)

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <SearchInput conversations={conversations} loading={loading} />
            <div className='divider px-3'></div>
            <Conversations loading={loading} conversations={conversations} />
            <LogoutButton />
        </div>
    )
}
export default Sidebar