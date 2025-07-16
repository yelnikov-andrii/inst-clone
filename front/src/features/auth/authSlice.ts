import { createSlice } from '@reduxjs/toolkit'

export interface AuthStateI {
  isAuthenticated: boolean;
  user: UserI | null;
  accessToken: string;
}

const initialState: AuthStateI = {
  isAuthenticated: false,
  user: null,
  accessToken: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
    },
    logOut: (state) => {
        state.isAuthenticated = false;
        state.accessToken = '';
        state.user = null;
    }
  },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer