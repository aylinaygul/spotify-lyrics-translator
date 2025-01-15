import React from 'react';
import { View, Text } from 'react-native';
import { Button, Title, Card } from 'react-native-paper';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function Home() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            {/* Başlık */}
            <Title style={styles.title}>Spotify Lyrics Translator</Title>

            {/* Kart Bileşeni */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.text}>Welcome to the Spotify Lyrics Translator</Text>
                    <Text style={styles.subtitle}>Refresh your token below to continue.</Text>
                </Card.Content>

                <Card.Actions style={styles.cardActions}>
                    {/* Spotify yeşili buton */}
                    <Button mode="contained" color="#1DB954" onPress={() => navigation.navigate('SpotifyLogin')}>
                        Refresh Token
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

export default Home;
