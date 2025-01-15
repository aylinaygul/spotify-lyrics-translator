import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from './styles'

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function Home() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.headerMain}>
            <Text>cdc</Text>
            <Button title="Refresh Token" onPress={() => navigation.navigate('SpotifyLogin')} />
        </View>
    )
}

export default Home;