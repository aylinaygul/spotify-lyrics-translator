import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LyricsState {
    lyrics: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: LyricsState = {
    lyrics: null,
    isLoading: false,
    error: null,
}

const lyricsSlice = createSlice({
    name: 'lyrics',
    initialState,
    reducers: {
        fetchLyricsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchLyricsSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.lyrics = action.payload;
        },
        fetchLyricsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchLyricsStart, fetchLyricsSuccess, fetchLyricsFailure } = lyricsSlice.actions;
export default lyricsSlice.reducer;