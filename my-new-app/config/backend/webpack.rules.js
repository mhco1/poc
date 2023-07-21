module.exports = [
    // Add support for native node modules
    {
        // We're specifying native_modules in the test because the asset relocator loader generates a
        // "fake" .node file which is really a cjs file.
        test: /native_modules[/\\].+\.node$/,
        use: 'node-loader',
    },
    {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@vercel/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    // {
    //     test: /\.tsx?$/,
    //     exclude: /(node_modules|\.webpack)/,
    //     use: {
    //         loader: 'ts-loader',
    //         options: {
    //             transpileOnly: true,
    //         },
    //     },
    // },
    {
        test: /\.(?:m?js|cjs|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
            //   ['@babel/preset-env', { targets: "defaults" }],
              ["@babel/preset-typescript"],
            ],
            plugins: [
                // ['wildcard', {
                //     'useCamelCase': true
                // }]
            ]
          }
        }
    },
    {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    },
];