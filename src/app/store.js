import filterReducer from '../conponents/common/filterSlice';
import notificationReducer from '../views/web/Slice/notificationSlice';

import { configureStore } from '@reduxjs/toolkit';

// state to use with useSelector
const rootReducer = {
    filter: filterReducer,
    notification: notificationReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
