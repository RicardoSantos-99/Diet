import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react';
import { Profile } from './profileInterface';

const Imc = ({ user, saveImc, refreshImcData }) => {
	const [age, setAge] = useState<string>('');
	const [height, setHeight] = useState<string>('');
	const [weight, setWeight] = useState<string>('');

	const validateInputs = () => {
		return (
			parseFloat(height) > 0 &&
			parseFloat(weight) > 0 &&
			parseFloat(age) > 0
		);
	};

	const resetFields = () => {
		setAge('');
		setHeight('');
		setWeight('');
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (!validateInputs()) {
			toast.error('Todos os campos devem ter valores maiores que zero.');
			return;
		}

		const profileData: Profile = {
			age: parseInt(age),
			height: parseFloat(height),
			weight: parseFloat(weight),
			user,
		};

		try {
			saveImc(profileData);

			toast.success('Imc salvo com sucesso!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			await refreshImcData();

			resetFields();
			return;
		} catch (errors) {
			toast.error('Houve um erro ao salvar os dados.');
			return;
		}
	};

	return (
		<Container maxW="container.xl" padding="8" height="100%" bg="white">
			<Flex alignItems="center" justifyContent="center" gap="4">
				<Heading as="h3" size="md">
					Informe seus dados para calcular o IMC
				</Heading>
			</Flex>
			<Box
				as="form"
				onSubmit={handleSubmit}
				display="flex"
				flexDirection="column"
				p={5}
			>
				<Flex
					alignItems="flex-end"
					justifyContent="space-between"
					gap="4"
				>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="age" color="#000">
							Idade
						</FormLabel>
						<Input
							id="age"
							type="text"
							placeholder="Idade"
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="height" color="#f1af09">
							Altura
						</FormLabel>
						<Input
							id="height"
							type="number"
							placeholder="Altura"
							value={height}
							onChange={(e) => setHeight(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="weight" color="#27ac09">
							Peso
						</FormLabel>
						<Input
							id="weight"
							type="number"
							placeholder="Peso"
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
						/>
					</FormControl>

					<Button
						colorScheme="blue"
						type="submit"
						size="lg"
						alignSelf="flex-end"
						onClick={handleSubmit}
					>
						Calcular
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};

export default Imc;
