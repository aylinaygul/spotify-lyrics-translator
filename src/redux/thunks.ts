import { AppDispatch } from './store';
import { XMLParser } from 'fast-xml-parser';

import { fetchLyricsStart, fetchLyricsSuccess, fetchLyricsFailure } from './slices/lyricsSlice';
import { translationStart, translationSuccess, translationFailure } from './slices/translationSlice';

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
    region: 'us-east-1',
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
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