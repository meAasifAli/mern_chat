import { create } from 'zustand'


const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    mesages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useConversation