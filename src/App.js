import React from 'react';
import { BreakpointProvider } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
	return (
		<BreakpointProvider>
			<Router>
				<Switch as="main">
					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</BreakpointProvider>
	);
}

export default App;
