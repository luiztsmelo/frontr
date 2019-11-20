import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { WiDaySunny, WiNightClear, WiDayCloudy, WiCloud, WiNightRain } from 'react-icons/wi';
import Odometer from 'react-odometerjs';

require('../assets/odometer.css');

export default function Weather() {
	const [state, setState] = useState({
		loading: true,
		weather: null,
	});

	const getWeather = async (position) => {
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

			const weatherNextHours = [];

			weatherNextHours.push(results[0].data);

			results[1].data.list.slice(0, 4).forEach((res) => weatherNextHours.push(res));

			setState({
				weather: weatherNextHours,
				loading: false,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const weatherIcon = () => {
		if (state.weather !== null) {
			switch (state.weather[0].weather[0].icon) {
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
		} else {
			return <WiDaySunny />;
		}
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getWeather);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}, []);

	useEffect(() => {
		weatherIcon();
	}, [state.weather]);

	console.log('weather', state.weather);

	return (
		<StyledWeather>
			<Temperature>
				{weatherIcon()}
				<Odometer value={state.weather === null ? 0 : Math.round(state.weather[0].main.temp)} />º
			</Temperature>
		</StyledWeather>
	);
}

const StyledWeather = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px 0 10px;
`;

const Temperature = styled.div`
	display: flex;
	align-items: center;
	font-size: 49px;
	font-weight: 700;
`;
