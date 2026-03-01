import {configureStore} from "@reduxjs/toolkit"
import { MessageSlice } from "./MessageSlice"


export const store = configureStore({
    reducer:MessageSlice.reducer
})