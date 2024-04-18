import styled from 'styled-components';

export const MainContainer = styled.nav`
	width: 80%;
	margin: 0 auto;
`;

export const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const Logo = styled.img`
	/* border-radius: 100px; */
	width: 64px;
`;

export const Menu = styled.div`
	font-size: 1.125rem;
	font-weight: 700;
	width: 60%;
	display: flex;
	justify-content: space-around;
	padding: 15px 0;
`;

export const Titles = styled.p`
	cursor: pointer;
`;

export const ContainerLogin = styled.div`
	width: 130px;
	cursor: pointer;
	padding: 0 10px;
	background-color: #f46708;
	border-radius: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Login = styled.p`
	color: #ffffff;
	font-weight: 700;
	padding: 0;
`;
