import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAuthSession } from 'aws-amplify/auth';
const initialState = {
    token: ''
}

export const fetchToken = createAsyncThunk('token/fetchStatus',
    async () => {
        const session = await fetchAuthSession();
        const token = session.tokens.accessToken;
        return token;
    }
)

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.token = action.payload;
        })
    }
})

export default tokenSlice.reducer;