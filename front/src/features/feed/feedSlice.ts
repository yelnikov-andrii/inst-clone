import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FeedState {
  feed: FeedItemI[];
  error: string;
}

const initialState: FeedState = {
  feed: [],
  error: "",
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    getFeedFromServer: (state, action: PayloadAction<FeedItemI[]>) => {
        state.feed = action.payload;
    },
    getFeedError: (state, action) => {
      state.error = action.payload;
    },
    clearFeed: (state) => {
      state.feed = []
    }
  },
})

export const { getFeedFromServer, clearFeed, getFeedError } = feedSlice.actions

export default feedSlice.reducer