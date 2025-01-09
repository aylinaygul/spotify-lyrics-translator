import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface TranslationState {
    translatedText: string | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: TranslationState = {
    translatedText: null,
    isLoading: false,
    error: null,
};

const translationSlice = createSlice({
    name: "translation",
    initialState,
    reducers: {
        translationStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        translationSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.translatedText = action.payload;
        },
        translationFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

    },
});

export const { translationStart, translationSuccess, translationFailure } = translationSlice.actions;
export default translationSlice.reducer;

