import React from 'react';
import {
	MainContainer,
	Container,
	Logo,
	Menu,
	Login,
	Titles,
	ContainerLogin,
} from './MainMenu.styled';
import NutriPlan from '../../assets/nutriplan.png';
import { Link } from 'react-router-dom';

const MainMenu = () => {
	return (
		<MainContainer>
			<Container>
				<Logo src={NutriPlan} />
				<Menu>
					<Titles>
						<Link to="/">Home</Link>
					</Titles>
					<Titles>
						<Link to="/alimentos">Alimentos</Link>
					</Titles>
					<Titles>
						<Link to="/receitas">Receitas</Link>
					</Titles>
					<Titles>Receitas</Titles>
					<ContainerLogin>
						<Login>
							<Link to="/login">Login</Link>
						</Login>
					</ContainerLogin>
				</Menu>
			</Container>
		</MainContainer>
	);
};

export default MainMenu;
