import React from 'react';
import styled from 'styled-components';
import Weather from '../components/Weather';
import TechNews from '../components/TechNews';
import HackerNews from '../components/HackerNews';
import GithubTrending from '../components/GithubTrending';
import Footer from '../components/Footer';

export default function Home() {
	return (
		<Page>
			<Logo>frontr</Logo>

			<Weather />

			<SectionTitle>Tech News</SectionTitle>
			<TechNews />

			<SectionTitle>Hacker News</SectionTitle>
			<HackerNews />

			<SectionTitle>JS Github Trending</SectionTitle>
			<GithubTrending />

			<Footer />
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	padding: 0 10%;
	background-color: #fff;
	color: ${(props) => props.theme.darkColor};
`;

const Logo = styled.span`
	font-family: 'Righteous', sans-serif;
	font-size: 27px;
	margin: 18px 0;
	color: #f00;
	user-select: none;
`;

const SectionTitle = styled.h2`
	font-size: 30px;
	padding: 90px 0 14px;
	text-transform: uppercase;
	letter-spacing: 2px;
	word-spacing: 2px;
`;
