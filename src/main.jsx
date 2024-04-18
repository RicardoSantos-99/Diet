import ReactDOM from 'react-dom/client';
import MainMenu from './components/MainMenu/MainMenu.component';
import FormAdd from './components/AddFood/Add.component';
import CalorieCalculation from './components/CalorieCalculation/CalorieCalculation.component';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider>
		<MainMenu />
		<FormAdd />
		<ToastContainer />
		<CalorieCalculation />
	</ChakraProvider>,
);
