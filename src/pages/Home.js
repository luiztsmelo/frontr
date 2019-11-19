import React from 'react';
import styled from 'styled-components';
import Weather from '../components/Weather';
import HackerNews from '../components/HackerNews';
import TechNews from '../components/TechNews';
import Footer from '../components/Footer';

export default function Home() {
	return (
		<Page>
			<Weather />

			<SectionTitle>Tech News</SectionTitle>
			<TechNews />

			<SectionTitle>Hacker News</SectionTitle>
			<HackerNews />

			<Footer />
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	padding: 0 10%;
	background-color: rgb(242, 242, 242);
	color: ${(props) => props.theme.darkColor};
`;

const SectionTitle = styled.h2`
	font-size: 36px;
	padding: 100px 0 15px;
`;
