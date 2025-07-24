import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice';
import drawerReducer from '../features/drawer/drawerReducer';
import modalReducer from '../features/modal/modalSlice'
import authReducer from '../features/auth/authSlice'
import myInfoReducer from '../features/myInfo/myInfoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    drawer: drawerReducer,
    modal: modalReducer,
    auth: authReducer,
    myInfo: myInfoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch