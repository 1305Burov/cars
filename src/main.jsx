import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './store/index';
import storage from 'redux-persist/lib/storage';
import App from './App.jsx'

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

createRoot(document.getElementById('root')).render(
    <Provider store={store} >
        <PersistGate loading={<h2>Loading...</h2>} persistor={persistStore(store)} >
            <App />
        </PersistGate>
    </Provider>
)
