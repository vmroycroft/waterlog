module.exports = {
	purge: [
		'./src/**/*.html',
		'./src/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				tan: '#F6F2DF',
				'dark-tan': '#e6e3d1',
				'light-blue': '#96E0DE',
				blue: '#76CDCE',
				'light-green': '#D2EA88',
				green: '#B5D861',
				'dark-green': '#99B752',
				'forest-green': '#4B6A22',
				'grass-green': '#8ac43d'
			},
			margin: {
				'80': '20rem'
			},
			width: {
				'84': '21rem'
			}
		},
		boxShadow: {
			outline: '0 0 0 3px rgba(117, 205, 206, 0.5)'
		}
	},
	variants: {},
	plugins: []
};
