import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentTrack, fetchLyrics, fetchTranslation } from '../../redux/thunks';
import { AppDispatch, RootState } from '../../redux/store';
import { View, Text, ActivityIndicator, Button, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

const LyricsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);

    const { lyrics, isLoading, error } = useSelector((state: RootState) => state.lyrics);
    const { translatedText } = useSelector((state: RootState) => state.translation);
    const { currentTrack } = useSelector((state: RootState) => state.player);
    const { accessToken } = useSelector((state: RootState) => state.auth);

    const [lyricsParts, setLyricsParts] = useState<string[]>([]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchCurrentTrack());
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (currentTrack) {
            dispatch(fetchLyrics(currentTrack));
        }
    }, [dispatch, currentTrack]);

    useEffect(() => {
        if (lyrics) {
            const parts = lyrics.split('\n').filter((line) => line.trim().length > 0);
            setLyricsParts(parts);
        }
    }, [lyrics]);

    const handleLinePress = (index: number, line: string) => {
        setSelectedLineIndex(index);
        dispatch(fetchTranslation(line, 'tr'));
    };

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'navy' }}>{currentTrack?.name}</Text>
            </View>
            <View style={[styles.lyricsBox, { flex: 13 }]}>
                <ScrollView>
                    {lyricsParts.map((part, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => handleLinePress(index, part)}>
                                <Text style={styles.modalTitle}>{part}</Text>
                            </TouchableOpacity>
                            {selectedLineIndex === index && (
                                <View >
                                    <Text style={styles.modalText}>
                                        {translatedText || 'Translating...'}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setSelectedLineIndex(null)}
                                    >
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Translate" onPress={() => {/* Navigate to translation screen */ }} />
            </View>
        </View>
    );
};

export default LyricsScreen;
