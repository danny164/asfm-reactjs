import { createSlice } from '@reduxjs/toolkit';

const idPostSlice = createSlice({
    name: 'Id Post',
    initialState: '',
    reducers: {
        updateIdPost(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = idPostSlice;
export const { updateIdPost } = actions;
export default reducer;
