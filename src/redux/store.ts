import { configureStore } from '@reduxjs/toolkit'
import lyricsReducer from './slices/lyricsSlice'
import translationReducer from './slices/translationSlice'

export const store = configureStore({
    reducer: {
        lyrics: lyricsReducer,
        translation: translationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;