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
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

const errorMessages = {
	'auth/invalid-credential': 'Senha/Email incorreto.',
	default: 'Ocorreu um erro ao tentar fazer login.',
};

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (email === '' || password === '') {
			toast.error('Preencha todos os campos.');
			return;
		}

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);

			navigate('/');
		} catch (err) {
			const errorMessage =
				errorMessages[err.code] || errorMessages['default'];

			toast.error(errorMessage);
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
							Entre na sua conta
						</Heading>
						<Text color="fg.muted">
							Não tem uma conta?{' '}
							<Link href="/register">Cadastre-se</Link>
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
								<Input
									id="email"
									type="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="password">Senha</FormLabel>
								<Input
									id="password"
									type="password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FormControl>
						</Stack>
						<HStack justify="space-between">
							<Checkbox defaultChecked>Lembrar-me</Checkbox>
							<Button variant="text" size="sm">
								Esqueceu a senha?
							</Button>
						</HStack>
						<Stack spacing="6">
							<Button onClick={handleSubmit}>Entrar</Button>
							<HStack>
								<Divider />
								<Text
									textStyle="sm"
									whiteSpace="nowrap"
									color="fg.muted"
								>
									ou continue com
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

export default SignIn;
