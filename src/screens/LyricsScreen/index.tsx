import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLyrics } from '../../redux/thunks';
import { AppDispatch, RootState } from '../../redux/store';
import { View, Text, ActivityIndicator, Button } from 'react-native';

const LyricsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { lyrics, isLoading, error } = useSelector((state: RootState) => state.lyrics);

    useEffect(() => {
        dispatch(fetchLyrics('Shape of You Ed Sheeran'));
    }, [dispatch]);

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View>
            <Text>{lyrics || 'No lyrics available'}</Text>
            <Button title="Translate" onPress={() => {/* Navigate to translation screen */ }} />
        </View>
    );
};

export default LyricsScreen;
