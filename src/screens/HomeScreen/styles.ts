import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Spotify'nın koyu arka planı
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1DB954', // Spotify yeşili
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#181818', // Koyu arka plan için
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#b3b3b3', // Hafif gri ton
  },
  cardActions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;
