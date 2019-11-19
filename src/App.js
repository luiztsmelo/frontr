import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Home from './pages/Home';

function App() {
	return (
		<Router>
			<Helmet>
				<link
					href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
					rel="stylesheet"
				/>
			</Helmet>
			<Switch>
				<ThemeProvider theme={theme}>
					<Route path="/" exact strict>
						<Home />
					</Route>
				</ThemeProvider>
			</Switch>
		</Router>
	);
}

export default App;
