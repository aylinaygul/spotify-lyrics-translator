import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/screens/HomeScreen"
import { store } from "./src/redux/store"
import { Provider } from 'react-redux';
import LyricsScreen from './src/screens/LyricsScreen';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <LyricsScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '20%'
  },
});
