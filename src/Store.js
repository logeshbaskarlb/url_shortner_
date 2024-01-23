import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Component/Reducer/UserReducer";

export const store = configureStore({
    reducer:{
        users: UserReducer
    }
})