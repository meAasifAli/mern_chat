import MsgContainer from "../../components/msgContainer/MsgContainer"
import Sidebar from "../../components/sidebar/Sidebar"


const Home = () => {
    return (
        <div className='flex sm:h-[450px] w-[70%] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Sidebar />
            <MsgContainer />
        </div>
    )
}
export default Home