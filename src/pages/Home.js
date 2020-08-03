import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { subDays, formatISO } from 'date-fns';
import { Breakpoint } from 'react-socks';
import Button from '../components/Button';
import location from '../assets/images/location.svg';
import grass from '../assets/images/grass.svg';
import rainDrop from '../assets/images/rain-drop.svg';

const Home = () => {
	// The station ID for Newport News, VA is KPHF0
	// TODO Determine why the Meteostat API is returning null for precip
	const STATION = 'KPHF0';

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [precipLastSeven, setPrecipLastSeven] = useState(null);
	const [precipLastThirty, setPrecipLastThirty] = useState(null);

	const calculatePrecip = (data) => {
		// Calculate the total precipitation from the precipitation values for each day
		// Precipitation values returned from the API are in millimeters (mm)
		const precipInMillimeters = data.reduce((sum, { prcp }) => sum + prcp, 0);

		// Convert precip value to inches
		const precipInInches = precipInMillimeters * 0.03937;

		// Round precip value to at most 2 decimal places (see https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary)
		const precip = Math.round((precipInInches + Number.EPSILON) * 100) / 100;

		return precip;
	};

	const fetchWeatherHistory = useCallback(async () => {
		try {
			const today = new Date();

			// Get weather data for the last 30 days (including today)
			const start = formatISO(subDays(today, 29), { representation: 'date' });
			const end = formatISO(today, { representation: 'date' });

			// Send a GET request to the meteostat API
			const url = `/.netlify/functions/fetchWeatherHistory?station=${STATION}&start=${start}&end=${end}`;
			const response = await axios.get(url);

			setIsLoaded(true);

			// If the response comes back OK from the meteostat API
			if (response.status === 200) {
				const weatherHistory = response.data.data;

				const lastSeven = calculatePrecip(weatherHistory.slice(0, 7));
				const lastThirty = calculatePrecip(weatherHistory);

				setPrecipLastSeven(lastSeven);
				setPrecipLastThirty(lastThirty);
			} else {
				// TODO Display a data loading error to the user
				setError(response.status);
			}
		} catch (e) {
			// TODO Display a data loading error to the user
			setIsLoaded(true);
			setError(e);
		}
	}, []);

	useEffect(() => {
		fetchWeatherHistory();
	}, [fetchWeatherHistory]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				{/* Render on extra small, small, and medium screens */}
				<Breakpoint medium down>
					<section className="flex flex-col h-screen bg-tan pt-8">
						<div className="px-4">
							<Button onClick={showSettings} className="w-full">
								<img src={location} alt="" className="inline align-top pr-2" />
								Carl in Newport News, VA
							</Button>
						</div>
						<div className="flex flex-col justify-center items-center h-full p-4">
							<div className="divide-y divide-dark-tan text-center">
								<h2 className="py-4">
									You've gotten <span className="text-dark-green">{precipLastSeven}</span> inches of rain in the last 7 days
								</h2>
								<h2 className="py-4">
									You've gotten <span className="text-dark-green">{precipLastThirty}</span> inches of rain in the last 30 days
								</h2>
							</div>
						</div>
						<div>
							<img src={rainDrop} alt="" className="w-16 m-auto mb-8" />
							<img src={grass} alt="" className="w-full" />
						</div>
					</section>
				</Breakpoint>

				{/* Render on large and up screens */}
				<Breakpoint large up>
					<section className="flex flex-col h-screen bg-tan pt-10">
						<div className="pr-10">
							<Button onClick={showSettings} className="float-right">
								<img src={location} alt="" className="inline align-top pr-2" />
								Carl in Newport News, VA
							</Button>
						</div>
						<div className="flex-grow mt-8 mb-8">
							<div className="flex flex-col justify-center items-center h-full">
								<img src={rainDrop} alt="" className="w-24 mb-8" />
								<div className="divide-y divide-dark-tan">
									<h2 className="text-2xl p-4">
										You've gotten <span className="text-dark-green">{precipLastSeven}</span> inches of rain in the last 7 days
									</h2>
									<h2 className="text-2xl p-4">
										You've gotten <span className="text-dark-green">{precipLastThirty}</span> inches of rain in the last 30 days
									</h2>
								</div>
							</div>
						</div>
						<img src={grass} alt="" className="w-full" />
					</section>
				</Breakpoint>
			</>
		);
	}

	function showSettings() {
		// currently does nothing
	}
};

export default Home;
