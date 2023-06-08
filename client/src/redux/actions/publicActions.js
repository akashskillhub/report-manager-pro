import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../api"

export const registerUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
    try {
        await API.post("/user/register", userData)
        return true
    } catch (error) {
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
})
export const loginUser = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
    try {
        await API.post("/user/login", userData)
        return true
    } catch (error) {
        console.log(error.message || "ddd");
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
}) 