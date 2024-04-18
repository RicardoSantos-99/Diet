import ReactDOM from 'react-dom/client';
import MainMenu from './components/MainMenu/MainMenu.component';
import CalorieCalculation from './components/CalorieCalculation/CalorieCalculation';
import FormAdd from './components/AddFood/Add.component';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider>
		<MainMenu />
		<FormAdd />
		<CalorieCalculation />
	</ChakraProvider>,
);
