import { AppDispatch, RootState } from './store';

import { fetchLyricsStart, fetchLyricsSuccess, fetchLyricsFailure } from './slices/lyricsSlice';
import { fetchCurrentTrackStart, fetchCurrentTrackSuccess, fetchCurrentTrackFailure } from './slices/playerSlice';
import { translationStart, translationSuccess, translationFailure } from './slices/translationSlice';
import { loginStart, loginSuccess, loginFailure, refreshStart, refreshSuccess, refreshFailure, logout } from './slices/authSlice';

interface Track {
    id: string;
    name: string;
    artists: string;
    album: string;
    imageUrl: string;
}

export const fetchLyrics = (track: Track) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchLyricsStart());
        const response = await fetch('https://api.lyrics.ovh/v1/' + track.artists + '/' + track.name);

        if (response.status === 404) {
            dispatch(fetchLyricsSuccess('Lyrics not found'));
            return;
        }

        else if (!response.ok) {
            dispatch(fetchLyricsFailure('Failed to fetch lyrics}'));
            return;
        }
        const data = await response.json();
        const lyrics = data.lyrics;
        dispatch(fetchLyricsSuccess(lyrics));
    } catch (error) {
        const err = error as Error;
        dispatch(fetchLyricsFailure(err.message));
    }
};

const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const translate = new AWS.Translate();

export const fetchTranslation = (text: string, targetLanguage: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(translationStart());
        const params = {
            Text: text,
            SourceLanguageCode: 'auto',
            TargetLanguageCode: targetLanguage,
        };

        const response = await translate.translateText(params).promise();
        const translatedText = response.TranslatedText;

        dispatch(translationSuccess(translatedText));
    } catch (error) {
        const err = error as Error;
        dispatch(translationFailure(err.message || "Translation failed"));
    }
};


export const spotifyLogin = (authCode: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: 'slt://lyrics',
            }).toString(),
        });

        if (!response.ok) {
            throw new Error('Failed to exchange authorization code for access token');
        }

        const data = await response.json();
        dispatch(loginSuccess(data));
    } catch (error) {
        const err = error as Error;
        dispatch(loginFailure(err.message));
    }
};

export const refreshSpotifyToken = (refreshToken: string) => async (dispatch: AppDispatch) => {
    dispatch(refreshStart());
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
            },
            body: new URLSearchParams({
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }).toString(),
        });

        if (!response.ok) {
            throw new Error(`Refresh failed: ${response.statusText}`);
        }

        const data = await response.json();
        const { access_token } = data;

        dispatch(refreshSuccess(access_token));
    } catch (error) {
        const err = error as Error;
        dispatch(refreshFailure(err.message));
    }
};

export const spotifyLogout = () => (dispatch: AppDispatch) => {
    dispatch(logout());
};

export const fetchCurrentTrack = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchCurrentTrackStart());
    try {
        const { accessToken } = getState().auth;
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch current track');
        }

        const data = await response.json();
        const track: Track = {
            id: data.item.id,
            name: data.item.name,
            artists: data.item.artists.map((artist: { name: string }) => artist.name).join(', '),
            album: data.item.album.name,
            imageUrl: data.item.album.images[0]?.url || '',
        };

        dispatch(fetchCurrentTrackSuccess(track));
    } catch (error) {
        const err = error as Error;
        dispatch(fetchCurrentTrackFailure(err.message));
    }
};
