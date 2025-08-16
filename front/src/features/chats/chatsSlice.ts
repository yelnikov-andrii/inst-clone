import { createSlice } from '@reduxjs/toolkit'

export interface ChatsState {
  chats: ChatI[];
  chatsLoading: boolean;
  chatsError: string;
  selectedChat: null | ChatI;
}

const initialState: ChatsState = {
  chats: [],
  chatsLoading: false,
  chatsError: "",
  selectedChat: null,
}

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChats: (state) => {
        state.chatsLoading = true;
    },
    getChatsSuccess: (state, action) => {
        state.chatsLoading = false;
        state.chats = action.payload;
        state.chatsError = ""
    },
    getChatsError: (state, action) => {
        state.chats = [];
        state.chatsError = action.payload;
        state.chatsLoading = false;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    clearChats: (state) => {
      state.chats = [];
      state.chatsError = "";
      state.chatsLoading = false;
      state.selectedChat = null;
    }
  },
})

export const { getChats, getChatsError, getChatsSuccess, setSelectedChat, clearChats } = chatsSlice.actions

export default chatsSlice.reducer