import { createSlice } from '@reduxjs/toolkit'

export interface AuthStateI {
  isAuthenticated: boolean;
  user: UserI | null;
  accessToken: string;
  isAuthLoaded: boolean;
}

const initialState: AuthStateI = {
  isAuthenticated: false,
  user: null,
  accessToken: '',
  isAuthLoaded: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthLoaded = true;
    },
    logOut: (state) => {
        state.isAuthenticated = false;
        state.accessToken = '';
        state.user = null;
        state.isAuthLoaded = true;
    },
    setAuthLoaded: (state) => {
      state.isAuthLoaded = true;
    }
  },
})

export const { logIn, logOut, setAuthLoaded } = authSlice.actions

export default authSlice.reducer