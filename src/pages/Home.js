import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { subDays, formatISO } from 'date-fns';
import { Breakpoint } from 'react-socks';

import Button from '../components/Button';

import location from '../assets/images/location.svg';
import grass from '../assets/images/grass.svg';
import rainDrop from '../assets/images/rain-drop.svg';

/**
 * The Home page displays the precipitation for the last 7 and last 30 days.
 *
 * @component
 * @category Pages
 */
function Home() {
	/**
	 * States
	 */

	const [precipLastSeven, setPrecipLastSeven] = useState(null);

	const [precipLastThirty, setPrecipLastThirty] = useState(null);

	/**
	 * Variables
	 */

	// The station ID for Newport News, VA is KPHF0
	// TODO Determine why the Meteostat API is still returning null
	const STATION = 'KPHF0';

	// Get weather data for the last 30 days (including today)
	const today = new Date();

	const start = formatISO(subDays(today, 29), { representation: 'date' });

	const end = formatISO(today, { representation: 'date' });

	// Backend URL
	const url = `/.netlify/functions/fetchWeatherHistory?station=${STATION}&start=${start}&end=${end}`;

	/**
	 * Functions
	 */

	/**
	 * Converts a value, given in millimeters, to inches.
	 */
	const millimetersToInches = (value) => {
		return value * 0.03937;
	};

	/**
	 * Rounds a value to at most 2 decimal places.
	 */
	const round = (value) => {
		// see https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
		return Math.round((value + Number.EPSILON) * 100) / 100;
	};

	const showSettings = () => {
		// currently does nothing
	};

	/**
	 * Data Fetching
	 */

	const [{ data, loading, error }] = useAxios(url);

	/**
	 * Side Effects
	 */

	useEffect(() => {
		const calculatePrecip = (data) => {
			// Calculate the total precipitation from the precipitation values for each day
			// Precipitation values returned from the API are in millimeters (mm)
			const precipInMillimeters = data.reduce((sum, { prcp }) => sum + prcp, 0);

			const precipInInches = millimetersToInches(precipInMillimeters);

			const precipRounded = round(precipInInches);

			return precipRounded;
		};

		if (data) {
			const weatherHistory = data.data;

			const lastSeven = calculatePrecip(weatherHistory.slice(0, 7));

			const lastThirty = calculatePrecip(weatherHistory);

			setPrecipLastSeven(lastSeven);

			setPrecipLastThirty(lastThirty);
		}
	}, [data]);

	/**
	 * JSX
	 */

	// TODO Make a loading animation
	if (loading) return <p>Loading...</p>;

	// TODO Make a nice error message
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			{/* Render on extra small, small, and medium screens */}
			<Breakpoint medium down>
				<section className="flex flex-col h-screen bg-tan-200 pt-8">
					<div className="px-4">
						<Button onClick={showSettings} className="w-full">
							<img src={location} alt="" className="inline align-top pr-2" />
							Carl in Newport News, VA
						</Button>
					</div>
					<div className="flex flex-col justify-center items-center h-full p-4">
						<div className="divide-y divide-dark-tan text-center">
							<h2 className="py-4">
								You've gotten
								<span className="text-green-500">{precipLastSeven}</span>inches
								of rain in the last 7 days
							</h2>
							<h2 className="py-4">
								You've gotten
								<span className="text-green-500">{precipLastThirty}</span>
								inches of rain in the last 30 days
							</h2>
						</div>
					</div>
					<div>
						<img src={rainDrop} alt="" className="w-16 m-auto mb-8" />
						<img src={grass} alt="" className="w-full bg-tan-200" />
					</div>
				</section>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<section className="flex flex-col h-screen bg-tan-200 pt-10">
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
									You've gotten
									<span className="text-green-500 mx-1">{precipLastSeven}</span>
									inches of rain in the last 7 days
								</h2>
								<h2 className="text-2xl p-4">
									You've gotten
									<span className="text-green-500 mx-1">
										{precipLastThirty}
									</span>
									inches of rain in the last 30 days
								</h2>
							</div>
						</div>
					</div>
					<img src={grass} alt="" className="w-full bg-tan-200" />
				</section>
			</Breakpoint>
		</>
	);
}

export default Home;
