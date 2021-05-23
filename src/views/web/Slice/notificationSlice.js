import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        updateNotification(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = notificationSlice;
export const { updateNotification } = actions;
export default reducer;
