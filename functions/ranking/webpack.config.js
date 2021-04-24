const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    target: 'node',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: false,
            util: false
        }
    }
};