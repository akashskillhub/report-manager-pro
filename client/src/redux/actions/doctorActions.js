import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const updateDoctorProfile = createAsyncThunk("doctor/profile/update", async (doctorData, { rejectWithValue, getState }) => {
    try {
        const { data } = await API.put(`/doctor/profile/${getState().public.login._id}`, doctorData)
        return true
    } catch (error) {
        console.log(error.message);
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
})

export const doctorGetAllTests = createAsyncThunk("doctor/test/fetch", async (testData, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/doctor/test`)
        return data.result
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
export const doctorAddTest = createAsyncThunk("doctor/test/add", async (testData, { rejectWithValue }) => {
    try {
        const { data } = await API.post(`/doctor/test/add`, testData)
        return true
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})