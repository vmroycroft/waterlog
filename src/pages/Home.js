import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { subDays, formatISO, parseISO, isSunday } from 'date-fns';
import { Breakpoint } from 'react-socks';
import Button from '../components/Button';
// import logo from '../assets/images/rain-tracker-logo.svg';
import location from '../assets/images/location.svg';
import grass from '../assets/images/grass.svg';
import rainDrop from '../assets/images/rain-drop.svg';

// const showTab = (tab) => {
// 	console.log('show tab ' + tab);
// };

const Home = () => {
	// The station ID for Newport News, VA is KPHF0
	const STATION = 'KPHF0';

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [precipLastSeven, setPrecipLastSeven] = useState(null);
	const [precipThisWeek, setPrecipThisWeek] = useState(null);

	const calculatePrecipLastSeven = (data) => {
		// Calculate the total precipitation from the precipitation values for each day
		// Precipitation values returned from the API are in millimeters (mm)
		const precipInMillimeters = data.reduce((sum, { precipitation }) => sum + precipitation, 0);

		// Convert precip value to inches (in)
		const precipInInches = precipInMillimeters * 0.03937;

		// Round precip value to at most 2 decimal places (see https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary)
		const precip = Math.round((precipInInches + Number.EPSILON) * 100) / 100;

		return precip;
	};

	const calculatePrecipThisWeek = (data) => {
		// Create an array containing only this week's data
		const sunday = data.findIndex(({ date }) => isSunday(parseISO(date)));
		const dataThisWeek = data.slice(sunday);

		// Calculate the total precipitation from the precipitation values for each day
		// Precipitation values returned from the API are in millimeters (mm)
		const precipInMillimeters = dataThisWeek.reduce((sum, { precipitation }) => sum + precipitation, 0);

		// Convert precip value to inches (in)
		const precipInInches = precipInMillimeters * 0.03937;

		// Round precip value to at most 2 decimal places (see https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary)
		const precip = Math.round((precipInInches + Number.EPSILON) * 100) / 100;

		return precip;
	};

	const fetchWeatherHistory = useCallback(async () => {
		try {
			const today = new Date();

			// Get weather data for the last 7 days, including today
			const start = formatISO(subDays(today, 7), { representation: 'date' });
			const end = formatISO(today, { representation: 'date' });

			// Send a GET request to the meteostat API
			const response = await axios.get(`https://api.meteostat.net/v1/history/daily?station=${STATION}&start=${start}&end=${end}&key=6EG05fra`);

			setIsLoaded(true);

			// If the response comes back OK from the meteostat API
			if (response.status === 200) {
				const weatherHistory = response.data.data;

				const lastSeven = calculatePrecipLastSeven(weatherHistory);
				const thisWeek = calculatePrecipThisWeek(weatherHistory);

				setPrecipLastSeven(lastSeven);
				setPrecipThisWeek(thisWeek);
			} else {
				// TODO Display a data loading error to the user
				setError(response.status);
			}
		} catch (error) {
			// TODO Display a data loading error to the user
			setIsLoaded(true);
			setError(error);
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
									You've gotten <span className="text-dark-green">{precipThisWeek}</span> inches of rain so far this week
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
										You've gotten <span className="text-dark-green">{precipThisWeek}</span> inches of rain so far this week
									</h2>
								</div>
							</div>
						</div>
						<img src={grass} alt="" className="w-full" />
					</section>

					{/* <div className="grid grid-cols-2 h-full">
					<section className="h-screen overflow-y-scroll">
						<nav className="flex justify-start items-center flex-no-wrap p-8">
							<img src={logo} className="inline pr-4 w-32" />
							<h1 className="inline text-4xl mr-16">Rain Tracker</h1>
							<ul className="flex">
								<li
									onClick={() => showTab('weekly-data')}
									className="{
									'border-b-4 border-blue': activeTab === 'weekly-data'
								}"
									className="cursor-pointer mx-8 pb-1"
								>
									Weekly data
								</li>
								<li
									onClick={() => showTab('monthly-todo')}
									className="{
									'border-b-4 border-blue': activeTab === 'monthly-todo'
								}"
									class="cursor-pointer mx-8 pb-1"
								>
									Monthly todo
								</li>
								<li onClick={() => showTab('tasks')} className="{ 'border-b-4 border-blue': activeTab === 'tasks' }" class="cursor-pointer mx-8 pb-1">
									Tasks
								</li>
							</ul>
						</nav>
						<div class="px-20 pb-8">
							<vr-weekly-data v-show="activeTab === 'weekly-data'"></vr-weekly-data>
							<vr-monthly-todo v-show="activeTab === 'monthly-todo'"></vr-monthly-todo>
							<vr-tasks v-show="activeTab === 'tasks'"></vr-tasks>
						</div>
					</section>
					<section class="flex flex-col h-screen bg-tan pt-10">
						<div class="pr-10">
							<vr-button className="float-right">
								<img src={location} className="inline align-top pr-2" />
								Carl in Newport News, VA
							</vr-button>
						</div>
						<div class="flex-grow mt-8 mb-8">
							<div class="flex flex-col justify-center items-center h-full">
								<img src={rainDrop} class="w-24 mb-8" />
								<h2 class="text-2xl">
									You've gotten <span class="text-dark-green">{precip}</span> inches of rain in the past week
								</h2>
							</div>
						</div>
						<img src={grass} class="w-full" />
					</section>
				</div> */}
				</Breakpoint>
			</>
		);
	}

	function showSettings() {
		// currently does nothing
	}
};

export default Home;
