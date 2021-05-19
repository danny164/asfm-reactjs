import filterReducer from '../conponents/common/filterSlice';
import totalReducer from '../conponents/common/totalSlice';
import progressReducer from '../conponents/common/progressSlice';
import pickedReducer from '../conponents/common/pickedSlice';
import completedReducer from '../conponents/common/completedSlice';
import cancelledReducer from '../conponents/common/cancelledSlice';
import notificationReducer from '../views/web/Slice/notificationSlice';
import { configureStore } from '@reduxjs/toolkit';

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
