import React from 'react';
import { Breakpoint } from 'react-socks';
import logo from '../assets/images/rain-tracker-logo.svg';
import location from "../assets/images/location.svg";
import grass from "../assets/images/grass.svg";
import rainDrop from "../assets/images/rain-drop.svg";

const precip = 2;

const showTab = (tab) => {
	console.log('show tab ' + tab);
}

function Home () {
	return (
		<>
			{/* Render on extra small, small, and medium screens */ }
			<Breakpoint medium down>

			</Breakpoint>
			{/* Render on large and up screens */ }
			<Breakpoint large up>
				<div className="grid grid-cols-2 h-full">
					<section className="h-screen overflow-y-scroll">
						<nav className="flex justify-start items-center flex-no-wrap p-8">
							<img src={ logo } className="inline pr-4 w-32" />
							<h1 className="inline text-4xl mr-16">Rain Tracker</h1>
							<ul className="flex">
								<li
									onClick={ () => showTab('weekly-data') }
									className="{
									'border-b-4 border-blue': activeTab === 'weekly-data'
								}"
									className="cursor-pointer mx-8 pb-1"
								>
									Weekly data
							</li>
								<li
									onClick={ () => showTab('monthly-todo') }
									className="{
									'border-b-4 border-blue': activeTab === 'monthly-todo'
								}"
									class="cursor-pointer mx-8 pb-1"
								>
									Monthly todo
							</li>
								<li onClick={ () => showTab('tasks') } className="{ 'border-b-4 border-blue': activeTab === 'tasks' }" class="cursor-pointer mx-8 pb-1">
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
							<vr-button className="float-right"><img src={ location } className="inline align-top pr-2" />Carl in Newport News, VA</vr-button>
						</div>
						<div class="flex-grow mt-8 mb-8">
							<div class="flex flex-col justify-center items-center h-full">
								<img src={ rainDrop } class="w-24 mb-8" />
								<h2 class="text-2xl">
									You've gotten <span class="text-dark-green">{ precip }</span> inches of rain in the past week
							</h2>
							</div>
						</div>
						<img src={ grass } class="w-full" />
					</section>
				</div>
			</Breakpoint >
		</>
	);
}

export default Home;