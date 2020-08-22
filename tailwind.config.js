module.exports = {
	purge: ['./src/**/*.html', './src/**/*.js'],
	theme: {
		extend: {
			colors: {
				tan: {
					'100': '#fbf9ef',
					'200': '#f6f2df',
					'300': '#ede5bf',
					'400': '#e4d9a0',
					'500': '#d7c570',
					'600': '#c9b240',
					'700': '#8f7e28',
					'800': '#504616',
					'900': '#211d08'
				},
				blue: {
					'100': '#f0f9fa',
					'200': '#d2eeef',
					'300': '#b4e3e4',
					'400': '#96d8d9',
					'500': '#76cdce',
					'600': '#41b2b4',
					'700': '#318687',
					'800': '#20595a',
					'900': '#0b1e1e'
				},
				green: {
					'100': '#f6f9f1',
					'200': '#e5edd4',
					'300': '#ccdba9',
					'400': '#b2c97e',
					'500': '#99b752',
					'600': '#839e42',
					'700': '#5f7330',
					'800': '#3b481e',
					'900': '#181d0c'
				}
			}
		},
		boxShadow: {
			outline: '0 0 0 3px rgba(180, 227, 228, 0.8)'
		}
	},
	variants: {},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true
	}
};
