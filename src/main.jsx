import ReactDOM from 'react-dom/client';
import MainMenu from './components/MainMenu/MainMenu.component';
import FormAdd from './components/AddFood/Add.component';
import CalorieCalculation from './components/CalorieCalculation/CalorieCalculation.component';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { FoodProvider } from './components/MainMenu/foodContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<ChakraProvider>
			<FoodProvider>
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/login" />
				</Routes>
				<FormAdd />
				<CalorieCalculation />
			</FoodProvider>
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
		</ChakraProvider>
	</Router>,
);
