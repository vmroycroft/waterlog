import React from 'react';
import { BreakpointProvider } from 'react-socks';
// import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

// setDefaultBreakpoints([
//   { xsmall: 0 },
//   { small: 640 },
//   { medium: 768 },
//   { large: 1024 },
//   { xlarge: 1280 }
// ]);

function App() {
	return (
		<BreakpointProvider>
			<Router basename="/rain">
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
