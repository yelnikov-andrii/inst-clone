import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MyInfoStateI {
  myInfo: null | MyInfoI
}

const initialState: MyInfoStateI = {
  myInfo: null,
}

export const myInfoSlice = createSlice({
  name: 'my_info',
  initialState,
  reducers: {
    getMyInfo: (state, action: PayloadAction<MyInfoI>) => {
        state.myInfo = action.payload;
    },
    clearMyInfo: (state) => {
      state.myInfo = null;
    }
  },
})

export const { getMyInfo, clearMyInfo } = myInfoSlice.actions

export default myInfoSlice.reducer