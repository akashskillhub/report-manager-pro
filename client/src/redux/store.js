import { configureStore } from "@reduxjs/toolkit"
import publicSlice from "./slices/publicSlice"
import doctorSlice from "./slices/doctorSlice"
import adminSlice from "./slices/adminSlice"

const reduxStore = configureStore({
    reducer: {
        public: publicSlice,
        doctor: doctorSlice,
        admin: adminSlice
    }
})

export default reduxStore