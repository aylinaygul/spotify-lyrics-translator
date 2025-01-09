import { AppDispatch } from './store';
import { fetchLyricsStart, fetchLyricsSuccess, fetchLyricsFailure } from './slices/lyricsSlice';
import { XMLParser } from 'fast-xml-parser';

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