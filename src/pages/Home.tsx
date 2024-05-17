import FormAdd from '../components/AddFood/Add.component';
import CalorieCalculation from '../components/CalorieCalculation/CalorieCalculation.component';
import { FoodProvider } from '../components/MainMenu/foodContext';

import MainMenu from '../components/MainMenu/MainMenu.component';
import Recommendation from './Recommendation';
import { Box } from '@chakra-ui/react';

const Home = () => {
	return (
		<Box minHeight="100vh" alignItems="center" justifyContent="center">
			<FoodProvider>
				<MainMenu />
				<FormAdd />
				<Recommendation />
				<CalorieCalculation />
			</FoodProvider>
		</Box>
	);
};

export default Home;
