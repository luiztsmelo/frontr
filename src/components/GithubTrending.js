import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdStar } from 'react-icons/md';

export default function GithubTrending() {
	const [state, setState] = useState({
		loading: true,
		repositories: [],
	});

	const getRepositories = async () => {
		const res = await axios.get('https://github-trending-api.now.sh/repositories?language=JavaScript&since=daily');

		setState({
			loading: false,
			repositories: res.data.sort((a, b) => b.currentPeriodStars - a.currentPeriodStars).slice(0, 3),
		});
	};

	useEffect(() => {
		getRepositories();
	}, []);

	console.log('repositories', state.repositories);

	return (
		<Repositories>
			{state.repositories.map((repository) => (
				<a className="repository" href={repository.url} target="__blank" key={repository.name}>
					<span className="__name">{repository.name}</span>

					<span className="__description">{repository.description}</span>

					<div className="stars">
						<MdStar color="#000" />
						<span className="__number">{repository.currentPeriodStars} today</span>
					</div>
				</a>
			))}
		</Repositories>
	);
}

const Repositories = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 15px;

	.repository {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 14px;
		padding: 15px;
		background-color: #fff;
		text-decoration: none;
		transition: all ease 0.25s;
		:hover {
			box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
		}

		.__name {
			font-size: 16px;
			font-weight: 600;
			color: #f00;
			text-align: center;
		}

		.__description {
			color: #000;
			font-size: 14px;
			line-height: 23px;
			text-align: center;
			padding: 11px 0;
		}

		.stars {
			display: flex;
			align-items: center;
			justify-content: center;
			.__number {
				font-size: 14px;
				font-weight: 600;
				color: #000;
				padding-left: 2px;
			}
		}
	}
`;
