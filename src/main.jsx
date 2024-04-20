import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<ChakraProvider>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="register" element={<Register />} />
			</Routes>
		</ChakraProvider>
	</Router>,
);
