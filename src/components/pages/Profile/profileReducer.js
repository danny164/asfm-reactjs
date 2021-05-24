import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: [],
    reducers: {
        updateProfile(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = profileSlice;
export const { updateProfile } = actions;
export default reducer;
