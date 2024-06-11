import { useState, useCallback } from 'react';
import Select from 'react-select';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { ExtendedFood } from './FoodInterface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFood } from '../MainMenu/foodContext';
import FoodService from './FoodService';
import FoodCard from '../AddFood/FoodCard.component';
import NutritionTable from '../AddFood/NutritionTable.component';
import { User } from 'firebase/auth';
import { auth } from '../../firebase-config';

const CalorieCalculation = () => {
	const { foods, waterIntake } = useFood();
	const [selectedFoods, setSelectedFoods] = useState<ExtendedFood[]>([]);
	const foodService = new FoodService();

	const handleSelectChange = useCallback((selectedItems: any) => {
		setSelectedFoods(selectedItems);
	}, []);
	const user: User = auth.currentUser;
	const saveDiet = useCallback(async () => {
		try {
			await foodService.saveDiet(selectedFoods, user.uid, waterIntake);
			toast.success('Dieta salva com sucesso!');
		} catch (error) {
			toast.error('Houve um erro ao salvar a dieta.');
		}
	}, [selectedFoods]);

	const options = foods.map((item) => ({
		...item,
		value: item.id,
		label: item.name,
	}));

	return (
		<Container maxW="container.xl" padding="8" height="100%" bg="white">
			<Heading as="h3" size="md" padding={3}>
				Selecione algum alimento
			</Heading>
			<Flex justifyContent="space-between">
				<Box w="100%">
					<Box
						padding="6"
						boxShadow="lg"
						_hover={{ bg: 'gray.100' }}
						cursor="pointer"
						w="full"
					>
						<Select
							isMulti
							onChange={handleSelectChange}
							options={options}
							name="colors"
							className="basic-multi-select"
							classNamePrefix="select"
						/>
					</Box>

					<FoodCard selectedFoods={selectedFoods} />
				</Box>

				<NutritionTable
					selectedFoods={selectedFoods}
					saveDiet={saveDiet}
				/>
			</Flex>
		</Container>
	);
};

export default CalorieCalculation;
