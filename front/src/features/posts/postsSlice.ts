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
    }
  },
})

export const { getPosts } = postsSlice.actions

export default postsSlice.reducer