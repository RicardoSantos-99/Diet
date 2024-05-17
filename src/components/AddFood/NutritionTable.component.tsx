import { useMemo } from 'react';
import {
	Box,
	Button,
	Center,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

import 'react-toastify/dist/ReactToastify.css';
import FoodService from '../CalorieCalculation/FoodService';

const NutritionTable = ({ selectedFoods, saveDiet }) => {
	const foodService = new FoodService();

	const totalNutrition = useMemo(() => {
		if (selectedFoods.length === 0) {
			return {
				calories: 0,
				protein: 0,
				carbohydrates: 0,
				fat: 0,
			};
		}

		return foodService.calculateTotalNutrition(selectedFoods);
	}, [selectedFoods]);

	return (
		<Box p="4">
			<Center
				flexDirection="column"
				bg="gray.100"
				p={4}
				borderRadius="lg"
			>
				<Heading as="h3" size="sm">
					Valor Nutricional:
				</Heading>
				<Table variant="simple" colorScheme="teal">
					<Thead>
						<Tr>
							<Th>Nutriente</Th>
							<Th>Quantidade</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Calorias</Td>
							<Td>{totalNutrition.calories} kcal</Td>
						</Tr>
						<Tr>
							<Td>Proteína</Td>
							<Td>{totalNutrition.protein} g</Td>
						</Tr>
						<Tr>
							<Td>Carboidratos</Td>
							<Td>{totalNutrition.carbohydrates} g</Td>
						</Tr>
						<Tr>
							<Td>Gordura</Td>
							<Td>{totalNutrition.fat} g</Td>
						</Tr>
					</Tbody>
				</Table>
				<Button colorScheme="blue" mt="4" onClick={saveDiet}>
					Salvar Dieta
				</Button>
			</Center>
		</Box>
	);
};

export default NutritionTable;
