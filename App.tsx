import HomeScreen from "./src/screens/HomeScreen"
import { store } from "./src/redux/store"
import { Provider } from 'react-redux';
import LyricsScreen from './src/screens/LyricsScreen';
import SpotifyLoginScreen from './src/screens/SpotifyLoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

export default function App() {
  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: 'home',
        SpotifyLogin: 'spotify',
        Lyrics: 'lyrics',
      },
    },
  };

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="SpotifyLogin" component={SpotifyLoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lyrics" component={LyricsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
