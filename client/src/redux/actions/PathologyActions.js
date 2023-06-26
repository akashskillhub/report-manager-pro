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
