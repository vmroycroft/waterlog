const axios = require('axios');

exports.handler = async (event) => {
	const station = event.queryStringParameters.station;
	const start = event.queryStringParameters.start;
	const end = event.queryStringParameters.end;

	const { METEOSTAT_API_KEY } = process.env;

	const url = `https://api.meteostat.net/v2/stations/daily?station=${station}&start=${start}&end=${end}`;

	const headers = {
		'x-api-key': METEOSTAT_API_KEY
	};

	try {
		const response = await axios.get(url, { headers });

		if (response.status !== 200) {
			return { statusCode: response.status, body: response.statusText };
		}

		return {
			statusCode: 200,
			body: JSON.stringify(response.data)
		};
	} catch (e) {
		console.log(e);

		return {
			statusCode: 500,
			body: JSON.stringify({ msg: e.message })
		};
	}
};
