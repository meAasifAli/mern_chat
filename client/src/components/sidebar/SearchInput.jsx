import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
const SearchInput = ({ conversations, loading }) => {
    const [search, setSearch] = useState("")
    const { setSelectedConversation } = useConversation()
    const handleSearchConversation = (ev) => {
        ev.preventDefault()
        if (!search) return
        const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));
        if (conversation) {
            setSelectedConversation(conversation)
            setSearch("")
        }
    }
    return (
        <form onSubmit={handleSearchConversation} className='flex items-center gap-2'>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='text' placeholder='Search…' className='input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    )
}
export default SearchInput