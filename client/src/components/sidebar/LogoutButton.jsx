import { useState } from "react";
import { userAuthprovider } from "../../context/AuthContext";
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios'
const LogoutButton = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = userAuthprovider()
    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await axios.post("https://mern-chat-app-b8mn.onrender.com/api/auth/logout")

            if (res?.status === 200) {
                localStorage.removeItem("authUser");
                setAuthUser(null)
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='mt-auto'>
            {
                loading ? <span className="loading loading-spinner"></span>
                    :
                    <BiLogOut onClick={handleLogout} className='w-6 h-6 text-white cursor-pointer' />
            }
        </div>
    )
}
export default LogoutButton