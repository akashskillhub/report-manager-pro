import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../api"


export const addTest = createAsyncThunk("/admin/add-test", async (testData, { rejectWithValue }) => {
    try {
        await API.post("/admin/test/add", testData)
        return true
    } catch (error) {
        return rejectWithValue((error.response && error.response.data.message) || error.message || "Something went wrong")
    }
})

export const testUpdate = createAsyncThunk("admin/test/update", async (testData, { rejectWithValue }) => {
    try {
        const { data } = await API.put(`/admin/test/${getState().public.login._id}`, testData)
        return true
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
export const testDelete = createAsyncThunk("admin/test/delete", async (testData, { rejectWithValue }) => {
    try {
        const { data } = await API.delete(`/admin/test/${getState().public.login._id}`, testData)
        return true
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
export const getAllTests = createAsyncThunk("admin/test/fetch", async (testData, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/admin/test`)
        return data.result
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
export const adminGetAllOrders = createAsyncThunk("admin/orders/fetch", async (testData, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/admin/orders`)
        return data.result
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})



