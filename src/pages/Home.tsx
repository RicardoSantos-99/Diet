import React from 'react';
import FormAdd from '../components/AddFood/Add.component';
import CalorieCalculation from '../components/CalorieCalculation/CalorieCalculation.component';
import { FoodProvider } from '../components/MainMenu/foodContext';
import { ToastContainer } from 'react-toastify';

import MainMenu from '../components/MainMenu/MainMenu.component';
import { Box } from '@chakra-ui/react';

const Home = () => {
	return (
		<Box minHeight="100vh" alignItems="center" justifyContent="center">
			<FoodProvider>
				<MainMenu />
				<FormAdd />
				<CalorieCalculation />
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</FoodProvider>
		</Box>
	);
};

export default Home;
