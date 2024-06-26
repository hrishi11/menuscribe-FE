import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'vendor',
    initialState: { vendorData: [], vendorErrors: [] },
    reducers: {
        signIn(state, action) {
            state.vendorData = []
        },
    }
})

export const authActions = authSlice.actions
export default authSlice