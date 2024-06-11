import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from '../components/OAuthButtonGroup';
import { PasswordField } from '../components/PasswordField';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AccountService from '../services/accountService';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleSubmit = async () => {
		if (email === '' || password === '') {
			return;
		}

		try {
			const accountService = new AccountService();
			await accountService.login(email, password);
			navigate('/home');
		} catch (err) {
			if (err.response && err.response.status === 401) {
				setError('Usuário ou senha estão incorretos');
			} else {
				setError('Ocorreu um erro ao tentar fazer login');
			}
		}
	};

	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
			minHeight="100vh"
		>
			<Stack spacing="8">
				<Stack spacing="6">
					<Stack spacing={{ base: '2', md: '3' }} textAlign="center">
						<Heading size={{ base: 'xs', md: 'sm' }}>
							Log in to your account
						</Heading>
						<Text color="fg.muted">
							Don't have an account? <Link href="#">Sign up</Link>
						</Text>
					</Stack>
				</Stack>
				<Box
					py={{ base: '0', sm: '8' }}
					px={{ base: '4', sm: '10' }}
					bg={{ base: 'transparent', sm: 'bg.surface' }}
					boxShadow={{ base: 'none', sm: 'md' }}
					borderRadius={{ base: 'none', sm: 'xl' }}
				>
					<Stack spacing="6">
						<Stack spacing="5">
							<FormControl>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input id="email" type="email" />
							</FormControl>
							<PasswordField />
						</Stack>
						<HStack justify="space-between">
							<Checkbox defaultChecked>Remember me</Checkbox>
							<Button variant="text" size="sm">
								Forgot password?
							</Button>
						</HStack>
						<Stack spacing="6">
							<Button>Sign in</Button>
							<HStack>
								<Divider />
								<Text
									textStyle="sm"
									whiteSpace="nowrap"
									color="fg.muted"
								>
									or continue with
								</Text>
								<Divider />
							</HStack>
							<OAuthButtonGroup />
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
};

export default Login;
