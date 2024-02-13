
import Conversation from "./Conversation"

const Conversations = ({ conversations, loading }) => {

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {
                conversations?.map((conversation, id) => {
                    return <Conversation key={id} conversation={conversation} lastId={id === conversations?.length - 1} />
                })
            }
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}
export default Conversations