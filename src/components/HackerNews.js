import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function HackerNews() {
	const [state, setState] = useState({
		loading: true,
		hackerNews: [],
	});

	const getHackerNews = async () => {
		const topItems = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');

		const promises = [];
		const articles = [];

		topItems.data.slice(0, 6).forEach((item) => {
			promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`));
		});

		const results = await axios.all(promises);

		results.forEach((res) => articles.push(res.data));

		setState({
			loading: false,
			hackerNews: articles,
		});
	};

	useEffect(() => {
		getHackerNews();
	}, []);

	console.log('hackerNews', state.hackerNews);

	return (
		<Articles>
			{state.hackerNews.map((article, index) => (
				<Article href={article.url} target="__blank" key={article.id}>
					<Number>{index + 1}</Number>
					<Title>{article.title}</Title>
				</Article>
			))}
		</Articles>
	);
}

const Articles = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: auto;
	grid-gap: 15px;
	width: 100%;
`;

const Article = styled.a`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 16px;
	align-items: center;
	border-radius: 14px;
	background-color: #fff;
	text-decoration: none;
	padding: 15px;
	transition: all ease 0.25s;
	:hover {
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
	}
`;

const Number = styled.span`
	font-size: 28px;
	font-weight: 500;
	color: #f00;
`;

const Title = styled.span`
	font-size: 15px;
	font-weight: 600;
	line-height: 23px;
	color: ${(props) => props.theme.darkColor};
`;
