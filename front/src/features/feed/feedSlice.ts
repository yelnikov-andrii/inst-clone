import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FeedState {
  feed: PostI[]
}

const initialState: FeedState = {
  feed: [],
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    getFeed: (state, action: PayloadAction<PostI[]>) => {
        state.feed = action.payload;
    },
    clearFeed: (state) => {
      state.feed = []
    }
  },
})

export const { getFeed, clearFeed } = feedSlice.actions

export default feedSlice.reducer