import { createSlice } from '@reduxjs/toolkit'

export interface PostsStateI {
  posts: PostI[]
}

const initialState: PostsStateI = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action) => {
        state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = []
    }
  },
})

export const { getPosts, clearPosts } = postsSlice.actions

export default postsSlice.reducer