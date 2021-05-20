import { configureStore } from '@reduxjs/toolkit';
import cancelledReducer from '../conponents/common/cancelledSlice';
import completedReducer from '../conponents/common/completedSlice';
import filterReducer from '../conponents/common/filterSlice';
import pickedReducer from '../conponents/common/pickedSlice';
import progressReducer from '../conponents/common/progressSlice';
import totalReducer from '../conponents/common/totalSlice';
import notificationReducer from '../views/web/Slice/notificationSlice';

// state to use with useSelector
const rootReducer = {
    filter: filterReducer,
    notification: notificationReducer,
    total: totalReducer,
    progress: progressReducer,
    picked: pickedReducer,
    completed: completedReducer,
    cancelled: cancelledReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
