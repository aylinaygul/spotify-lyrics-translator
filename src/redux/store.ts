import { configureStore } from '@reduxjs/toolkit'
import lyricsReducer from './slices/lyricsSlice'
import translationReducer from './slices/translationSlice'
import authReducer from './slices/authSlice'
import playerReducer from './slices/playerSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        lyrics: lyricsReducer,
        translation: translationReducer,
        player: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;