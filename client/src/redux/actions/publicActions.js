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
        console.log(error.message);
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
})
export const continueWithGoogle = createAsyncThunk("user/login/google", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.post("/auth/continue-with-google", userData)
        localStorage.setItem("info", JSON.stringify(data.result))
        return data.result
    } catch (error) {
        console.log(error.message);
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
})
export const logout = createAsyncThunk("user/logout", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.post("/auth/logout", userData)
        localStorage.removeItem("info")
        return true
    } catch (error) {
        console.log(error.message);
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
}) 