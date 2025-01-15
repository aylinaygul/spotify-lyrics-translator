import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Track {
    id: string;
    name: string;
    artists: string;
    album: string;
    imageUrl: string;
}

interface PlayerState {
    currentTrack: Track | null;
    loading: boolean;
    error: string | null;
}

const initialState: PlayerState = {
    currentTrack: null,
    loading: false,
    error: null,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        fetchCurrentTrackStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCurrentTrackSuccess(state, action: PayloadAction<Track>) {
            state.currentTrack = action.payload;
            state.loading = false;
        },
        fetchCurrentTrackFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    fetchCurrentTrackStart,
    fetchCurrentTrackSuccess,
    fetchCurrentTrackFailure,
} = playerSlice.actions;

export default playerSlice.reducer;
