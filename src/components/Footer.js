import React from 'react';
import styled from 'styled-components';

export default function Footer() {
	return (
		<StyledFooter>
			<Text>
				Handmade by&nbsp;
				<Link href="https://github.com/luiztsmelo" target="__blank">
					Tarcísio Melo
				</Link>
			</Text>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	display: flex;
	flex-flow: column;
	align-items: center;
	padding: 140px 0 15px;
`;

const Text = styled.span`
	font-size: 14px;
	font-weight: 500;
`;

const Link = styled.a`
	color: ${(props) => props.theme.darkColor};
`;
