import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { WiDaySunny, WiNightClear, WiDayCloudy, WiCloud, WiNightRain } from 'react-icons/wi';
import Odometer from 'react-odometerjs';
import { fromUnixTime, lightFormat } from 'date-fns';

require('../assets/odometer.css');

export default function Weather() {
	const [state, setState] = useState({
		loading: true,
		weather: null,
		forecast: [],
	});

	const fetchWeatherAndForecast = async (position) => {
		try {
			const promises = [];

			promises.push(
				axios.get(
					`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=a2c6c029f820764dd2869be3684a65ab`,
				),
			);

			promises.push(
				axios.get(
					`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=a2c6c029f820764dd2869be3684a65ab`,
				),
			);

			const results = await axios.all(promises);

			setState({
				weather: results[0].data,
				forecast: results[1].data.list.slice(0, 9),
				loading: false,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const weatherIcon = (icon) => {
		if (!state.loading) {
			switch (icon) {
				case '01d':
					return <WiDaySunny />;
				case '01n':
					return <WiNightClear />;
				case '02d':
					return <WiDayCloudy />;
				case '03d':
					return <WiCloud />;
				case '10n':
					return <WiNightRain />;
				default:
					return <WiDaySunny />;
			}
		}
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(fetchWeatherAndForecast);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}, []);

	console.log('weather', state.weather);
	console.log('forecast', state.forecast);

	return (
		<StyledWeather>
			<div className="current-weather">
				{state.weather === null ? <WiDaySunny /> : weatherIcon(state.weather.weather[0].icon)}
				<Odometer value={state.weather === null ? 0 : Math.round(state.weather.main.temp)} />º
			</div>
			<div className="forecast-cards">
				{state.forecast.map((cast) => (
					<div className="card">
						<span className="__hour">{lightFormat(fromUnixTime(cast.dt), 'HH')}h</span>
						<div className="__icon">
							{state.forecast.length === 0 ? <WiDaySunny /> : weatherIcon(cast.weather[0].icon)}
						</div>
						<span className="__temp">{Math.round(cast.main.temp)}º</span>
					</div>
				))}
			</div>
		</StyledWeather>
	);
}

const StyledWeather = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.current-weather {
		display: flex;
		align-items: center;
		font-size: 47px;
		font-weight: 700;
		padding: 30px 0 50px;
	}

	.forecast-cards {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-gap: 25px;
		width: 100%;
		.card {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 10px;
			.__icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 3px 0;
				font-size: 33px;
			}
			.__temp {
				font-size: 20px;
				font-weight: 600;
			}
		}
	}
`;
