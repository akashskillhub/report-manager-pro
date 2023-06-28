import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../api"

export const getPathologyOrders = createAsyncThunk("pathology/orders/get", async (pathologyData, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/pathology/orders`)
        return data.result
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
export const PathologyAcceptOrderAction = createAsyncThunk("pathology/orders/update", async (orderData, { rejectWithValue }) => {
    try {
        const { data } = await API.put(`/pathology/orders/${orderData._id}`)
        return true
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
export const PathologyReportUploadAction = createAsyncThunk("pathology/report/upload", async (orderData, { rejectWithValue }) => {
    try {
        const { data } = await API.put(`/pathology/orders/report/${orderData._id}`, orderData.fd)
        return true
    } catch (error) {
        console.log(error.message)
        return rejectWithValue((error.response && error.response.data.message || error.message) || "somthing went wrong")
    }
})
