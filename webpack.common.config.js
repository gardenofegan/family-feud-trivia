var ProvidePlugin = require('webpack').ProvidePlugin;
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './js/app.js'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.(jpe?g|png|gif)$/,
            exclude: /(node_modules)/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        })
        // ,
        // 
        // 
        // Only if needed for mobile usage
        // 
        // 
        // new BrowserSyncPlugin(
        //   // BrowserSync options 
        //   {
        //     // browse to http://localhost:3000/ during development 
        //     host: 'localhost',
        //     port: 3000,
        //     // proxy the Webpack Dev Server endpoint 
        //     // (which should be serving on http://localhost:3100/) 
        //     // through BrowserSync 
        //     proxy: 'http://localhost:8080/'
        //   },
        //   // plugin options 
        //   {
        //     // prevent BrowserSync from reloading the page 
        //     // and let Webpack Dev Server take care of this 
        //     reload: false
        //   }
        // )
    ],
    resolve: {
        extensions: ['', '.js', '.css'],
        alias: {
            "scrollTo": path.resolve(
                __dirname,
                "node_modules/jquery.scrollto/jquery.scrollTo.min"
            ),
            "waypoints": path.resolve(
                __dirname,
                "node_modules/waypoints/lib/jquery.waypoints.min"
            ),
        }
    }
};
