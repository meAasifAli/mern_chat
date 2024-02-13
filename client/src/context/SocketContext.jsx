import { createContext, useContext, useState, useEffect } from "react";
import { userAuthprovider } from "./AuthContext";
import io from 'socket.io-client'

const socketContext = createContext()



const SocketContextProvider = ({ children }) => {
    const { authUser } = userAuthprovider()
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if (authUser) {
            const socket = io("https://mern-chat-app-b8mn.onrender.com", {
                query: {
                    userId: authUser?._id
                }
            })
            setSocket(socket)

            socket.on("getOnlineusers", (users) => {
                setOnlineUsers(users)
            })
            return () => setSocket(null)
        }
        else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>{children}</socketContext.Provider>
    )
}

export default SocketContextProvider

export const useSocketContext = () => useContext(socketContext)