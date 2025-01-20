module.exports = function (api) {
    api.cache(false);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['module:react-native-dotenv', {
                moduleName: 'react-native-dotenv',
                verbose: false,
                path: '.env',
                safe: false,
                allowList: null,
                denyList: null,
            }],
        ],
    };
};