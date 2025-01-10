import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLyrics } from '../../redux/thunks';
import { AppDispatch, RootState } from '../../redux/store';
import { View, Text, ActivityIndicator, Button, ScrollView } from 'react-native';
import styles from './styles';

const LyricsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { lyrics, isLoading, error } = useSelector((state: RootState) => state.lyrics);

    useEffect(() => {
        dispatch(fetchLyrics(''));
    }, [dispatch]);

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Lyrics</Text>
            </View>
            <View style={[styles.lyricsBox, { flex: 13 }]}>
                <ScrollView>
                    <Text>{lyrics || 'No lyrics available'}</Text>
                </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Translate" onPress={() => {/* Navigate to translation screen} /> */ }} />
            </View>
        </View >
    );
};

export default LyricsScreen;
