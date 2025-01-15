import { AppDispatch, RootState } from './store';
import { XMLParser } from 'fast-xml-parser';

import { fetchLyricsStart, fetchLyricsSuccess, fetchLyricsFailure } from './slices/lyricsSlice';
import { fetchCurrentTrackStart, fetchCurrentTrackSuccess, fetchCurrentTrackFailure } from './slices/playerSlice';
import { translationStart, translationSuccess, translationFailure } from './slices/translationSlice';
import { loginStart, loginSuccess, loginFailure, refreshStart, refreshSuccess, refreshFailure, logout } from './slices/authSlice';


export const fetchLyrics = (trackId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchLyricsStart());
    try {
        const response = await fetch(`http://api.chartlyrics.com/apiv1.asmx/GetLyric?lyricId=194278&lyricCheckSum=78eaaf78ba4ed0b36c2a05aafe05fb6f`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const text = await response.text();

        const parser = new XMLParser();
        const data = parser.parse(text);
        const lyrics = data.GetLyricResult?.Lyric;

        if (!lyrics) {
            throw new Error('Lyrics not found');
        }

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

require('dotenv').config();

var clientId = process.env.SPOTIFY_CLIENT_ID;
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
var redirectUri = process.env.SPOTIFY_REDIRECT_URI;

export const spotifyLogin = (authCode: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: redirectUri,
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
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
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

interface Track {
    id: string;
    name: string;
    artists: string;
    album: string;
    imageUrl: string;
}

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
