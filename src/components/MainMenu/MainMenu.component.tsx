import { Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import NutriPlan from '../../assets/nutriplan.png';

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const MainMenu = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		signOut(auth);

		navigate('/sign-in');
	};
	return (
		<Flex as="nav" align="center" justify="center" p={4} bg="gray.100">
			<Image src={NutriPlan} alt="NutriPlan Logo" h="50px" ml={4} />
			<Spacer />
			<Flex as="div" align="center" mr={4}>
				<Link as={RouterLink} to="/" fontWeight="bold" mx={2}>
					Home
				</Link>

				<Link
					as={RouterLink}
					to="/recomendacoes"
					fontWeight="bold"
					mx={2}
				>
					Recomendações
				</Link>

				<Link as={RouterLink} to="/receitas" fontWeight="bold" mx={2}>
					Receitas
				</Link>

				<Link as={RouterLink} to="/profile" fontWeight="bold" mx={2}>
					Perfil
				</Link>

				<Button
					p={2}
					border="1px"
					borderColor="gray.200"
					borderRadius="md"
					mx={2}
					onClick={handleLogout}
				>
					Sair
				</Button>
			</Flex>
		</Flex>
	);
};

export default MainMenu;
