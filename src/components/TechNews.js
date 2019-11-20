import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { parseISO, formatDistanceToNow } from 'date-fns';

export default function HackerNews() {
	const [state, setState] = useState({
		loading: true,
		techNews: [],
	});

	const getTechNews = async () => {
		const res = await axios.get(
			'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=7e0522cfa4e84bc0b60fa35fd9ef2edd',
		);

		setState({
			loading: false,
			techNews: res.data.articles.slice(0, 3),
		});
	};

	useEffect(() => {
		getTechNews();
	}, []);

	console.log('techNews', state.techNews);

	return (
		<Articles>
			{state.techNews.map((article) => (
				<Article href={article.url} target="__blank" key={article.url}>
					{article.urlToImage !== null ? <Image src={article.urlToImage} alt={article.title} /> : <EmptyImage />}

					<Description>
						<Date>{formatDistanceToNow(parseISO(article.publishedAt), { addSuffix: true })}</Date>
						<Title>{article.title.split(' - ')[0]}</Title>
					</Description>
				</Article>
			))}
		</Articles>
	);
}

const Articles = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 22px;
`;

const Article = styled.a`
	display: flex;
	flex-flow: column;
	border-radius: 14px;
	overflow: hidden;
	background-color: #fff;
	text-decoration: none;
	box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
	transition: all ease 0.25s;
	&:hover {
		box-shadow: 2px 2px 25px rgba(0, 0, 0, 0.5);
	}
`;

const Image = styled.img`
	height: 160px;
	object-fit: cover;
	width: 100%;
	background-color: #272727;
	border-radius: 14px 14px 0 0;
	filter: grayscale(100%);
	transition: all ease 0.25s;
	${Article}:hover & {
		filter: none;
	}
`;

const EmptyImage = styled.div`
	height: 160px;
	width: 100%;
	background-color: #3e3e3e;
	border-radius: 14px 14px 0 0;
`;

const Description = styled.div`
	padding: 17px;
`;

const Date = styled.p`
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 600;
	color: #f00;
	margin: 0;
	padding-bottom: 9px;
`;

const Title = styled.p`
	font-size: 15px;
	font-weight: 600;
	line-height: 23px;
	color: #272727;
	margin: 0;
`;
