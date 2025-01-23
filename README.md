# Spotify Lyrics Translator 🎵🌍

Spotify Lyrics Translator is a React Native application designed to enhance your music experience by displaying real-time lyrics and translating them into your language. The app integrates seamlessly with Spotify to fetch song lyrics and uses translation tools to provide accurate results.


## Features ✨
- **Lyrics Display**: Fetches real-time song lyrics using the **Spotify API**.
- **Lyrics Translation**: Translates lyrics into multiple languages with **AWS Translate**.
- **Word/Line Interaction**: Tap on words or sentences in lyrics to see their meanings, powered by **OVH API**.

## Tech Stack 🛠️
- **Frontend:** React Native, Expo
- **State Management:** Redux
- **APIs:** Spotify API, AWS Translate, OVH API


## Usage 📖
- **Log in with Spotify**: Sign in using your Spotify account to enable lyric fetching.
- **View Lyrics**: Play a song on Spotify, and the app will display its lyrics in real-time.
- **Translate Lyrics**: Select your preferred language to view translated lyrics.
- **Explore Words**: Tap on any word or sentence to see its detailed meaning.


## Planned Updates 🚀
- **Language Preferences**: Automatically detect and set the user's preferred translation language.
- **Playlist Management**: Organize translated songs into playlists.
- **Music Data Insights**: Visualize listening habits and preferences.
- **Enhanced Design**: Improve the app's user interface for a more intuitive and visually appealing experience.


## Installation ⚙️

1. Clone the repository:

   ```bash
   git clone https://github.com/aylinaygul/spotify-lyrics-translator.git
   cd spotify-lyrics-translator

3. Install dependencies:

   ```bash
   npm install

4. Set up your API keys:
  - Spotify API:
  Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add your **Client ID** and **Client Secret** to an `.env` file:

    ```env
    SPOTIFY_CLIENT_ID=your_client_id
    SPOTIFY_CLIENT_SECRET=your_client_secret
  - AWS Translate:
  Add your AWS access keys and region to the `.env` file:

    ```env
    AWS_ACCESS_KEY_ID=your_access_key
    AWS_SECRET_ACCESS_KEY=your_secret_key
    AWS_REGION=your_region

5. Start the application:

   ```bash
   npx expo start

---
