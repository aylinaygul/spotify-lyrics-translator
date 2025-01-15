import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { spotifyLogin } from '../../redux/thunks';
import { AppDispatch } from '../../redux/store';
import styles from './styles';

require('dotenv').config();

const SpotifyLogin = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(true);

    const authURL = `https://accounts.spotify.com/authorize?${new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email user-read-currently-playing',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }).toString()}`;

    const handleNavigationStateChange = (event: any) => {
        if (event.url.startsWith(process.env.SPOTIFY_REDIRECT_URI)) {
            const urlParams = new URLSearchParams(event.url.split('?')[1]);
            const authCode = urlParams.get('code');
            if (authCode) { dispatch(spotifyLogin(authCode)); }
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#1DB954" />}
            <WebView
                source={{ uri: authURL }}
                onNavigationStateChange={handleNavigationStateChange}
                onLoadEnd={() => setLoading(false)}
                style={styles.webView}
            />
        </View>
    );
};

export default SpotifyLogin;
