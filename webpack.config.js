const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/app/appMain.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
};
