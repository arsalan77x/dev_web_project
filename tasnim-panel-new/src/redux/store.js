import errorReducer from "./error_slice";
import userReducer from "./user_slice";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        error: errorReducer,
        user: userReducer
    }
})