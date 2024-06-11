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
import { useFood } from '../MainMenu/foodContext';

const FormAdd = () => {
	const { addFood } = useFood();
	const [foodName, setFoodName] = useState<string>('');
	const [calories, setCalories] = useState<string>('');
	const [proteins, setProteins] = useState<string>('');
	const [carbohydrates, setCarbohydrates] = useState<string>('');
	const [fats, setFats] = useState<string>('');

	const validateInputs = () => {
		return (
			parseFloat(calories) > 0 &&
			parseFloat(proteins) > 0 &&
			parseFloat(carbohydrates) > 0 &&
			parseFloat(fats) > 0
		);
	};
	const resetFields = () => {
		setFoodName('');
		setCalories('');
		setProteins('');
		setCarbohydrates('');
		setFats('');
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (!validateInputs()) {
			toast.error('Todos os campos devem ter valores maiores que zero.');
			return;
		}

		const foodData = {
			name: foodName,
			calories: parseFloat(calories),
			protein: parseFloat(proteins),
			carbohydrates: parseFloat(carbohydrates),
			fat: parseFloat(fats),
			id: Math.random().toString(),
		};

		try {
			addFood(foodData);
			toast.success('Alimento salvo com sucesso!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			resetFields();
			return;
		} catch (errors) {
			if (errors.name[0] == 'has already been taken') {
				toast.error('Esse alimento já existe.');
				return;
			}
			toast.error('Houve um erro ao salvar os dados.');
			return;
		}
	};

	return (
		<Container maxW="container.xl" padding="8" height="100%" bg="white">
			<Heading as="h3" size="md">
				Adicione novos alimentos:
			</Heading>

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
						<FormLabel htmlFor="foodName" color="#000">
							Nome do alimento
						</FormLabel>
						<Input
							id="foodName"
							type="text"
							placeholder="Nome do Alimento"
							value={foodName}
							onChange={(e) => setFoodName(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="calories" color="#f1af09">
							Calorias
						</FormLabel>
						<Input
							id="calories"
							type="number"
							placeholder="Calorias"
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="proteins" color="#27ac09">
							Proteínas
						</FormLabel>
						<Input
							id="proteins"
							type="number"
							placeholder="Proteínas"
							value={proteins}
							onChange={(e) => setProteins(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="carbohydrates" color="#f46708">
							Carboidratos
						</FormLabel>
						<Input
							id="carbohydrates"
							type="number"
							placeholder="Carboidratos"
							value={carbohydrates}
							onChange={(e) => setCarbohydrates(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired flex="1">
						<FormLabel htmlFor="fats" color="#b361e8">
							Gorduras
						</FormLabel>
						<Input
							id="fats"
							type="number"
							placeholder="Gorduras"
							value={fats}
							onChange={(e) => setFats(e.target.value)}
						/>
					</FormControl>
					<Button
						colorScheme="blue"
						type="submit"
						size="lg"
						alignSelf="flex-end"
						onClick={handleSubmit}
					>
						Salvar
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};

export default FormAdd;
