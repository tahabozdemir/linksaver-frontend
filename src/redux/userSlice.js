import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAuthSession } from 'aws-amplify/auth';
const initialState = {
    accessToken: '',
    userId: ''
}

export const fetchToken = createAsyncThunk('token/fetchStatus',
    async () => {
        const session = await fetchAuthSession();
        const token = session.tokens.accessToken;
        return token;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.accessToken = null;
            state.userId = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            state.userId = action.payload.payload.username;
        })
    }
})
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;