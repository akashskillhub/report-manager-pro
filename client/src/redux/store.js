import { configureStore } from "@reduxjs/toolkit"
import publicSlice from "./slices/publicSlice"

const reduxStore = configureStore({
    reducer: {
        public: publicSlice
    }
})

export default reduxStore