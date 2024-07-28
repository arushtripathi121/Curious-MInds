// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// const appStore = configureStore({

//     reducer: {
//         user: userReducer,
//     }
// })

// export default appStore;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(appStore);
export default appStore;
