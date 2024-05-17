import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

const errorMessages = {
	'auth/email-already-in-use': 'Email já cadastrado.',
	'auth/invalid-email': 'Email inválido.',
	'auth/weak-password': 'Senha fraca.',
	default: 'Ocorreu um erro ao tentar criar a conta.',
};

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async () => {
		console.log(email, password);
		if (email === '' || password === '') {
			toast.error('Preencha todos os campos.');
			return;
		}

		try {
			await createUserWithEmailAndPassword(auth, email, password);
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
							Crie sua conta
						</Heading>
						<Text color="fg.muted">
							Já possui uma conta?{' '}
							<Link href="/sign-in">Entrar</Link>
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
							<Button onClick={handleSubmit}>Criar conta</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
};

export default Register;
