import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import MainMenu from './components/MainMenu/MainMenu.component';
import Profile from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<ChakraProvider>
			<Routes>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							{' '}
							<Home />{' '}
						</ProtectedRoute>
					}
				/>

				<Route
					path="/recommendation"
					element={
						<ProtectedRoute>
							<MainMenu />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<MainMenu />
							<Profile />
						</ProtectedRoute>
					}
				/>
			</Routes>
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
