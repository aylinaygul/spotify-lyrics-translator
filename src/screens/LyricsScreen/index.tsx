import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchLyrics, fetchTranslation } from '../../redux/thunks';
import { fetchCurrentTrack } from '../../redux/thunks';
import { AppDispatch, RootState } from '../../redux/store';
import { View, Text, ActivityIndicator, Button, ScrollView } from 'react-native';
import styles from './styles';

const LyricsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { lyrics, isLoading, error } = useSelector((state: RootState) => state.lyrics);
    const { translatedText } = useSelector((state: RootState) => state.translation);
    const { currentTrack } = useSelector((state: RootState) => state.player);
    const { accessToken } = useSelector((state: RootState) => state.auth);

    // useEffect(() => {
    //     dispatch(fetchLyrics(''));
    // }, [dispatch]);

    // useEffect(() => {
    //     if (lyrics) {
    //         dispatch(fetchTranslation(lyrics, 'tr'));
    //     }
    // }, [lyrics, dispatch]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchCurrentTrack());
        }
        console.log(currentTrack);


    }, [dispatch, accessToken]);

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Lyrics</Text>
            </View>
            <View style={[styles.lyricsBox, { flex: 13 }]}>
                <ScrollView>
                    <Text>{currentTrack?.name}</Text>
                    {/* <Text>{lyrics || 'No lyrics available'}</Text>
                    <Text>{translatedText}</Text> */}
                </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Translate" onPress={() => {/* Navigate to translation screen} /> */ }} />
            </View>
        </View >
    );
};

export default LyricsScreen;
