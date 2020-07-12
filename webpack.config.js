module.exports = {
	entry: ['@babel/polyfill', './src/main.js'],
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js',
	},
	// atualiza automaticamente
	devServer: {
		contentBase: __dirname + '/public',
	},
	module: {
		rules: [
			// loader que vai ser utlizado
			{
				// se termina com .js
				test: /\.js$/,
				// que ele nao execute node modules
				exclude: /node_modules/,
				// yarn add babel-loader -D
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
