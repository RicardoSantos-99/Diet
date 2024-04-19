import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react';

import Autosuggest from 'react-autosuggest';
import {
	MainContainer,
	InputContainer,
	ListContainer,
} from './CalorieCalculation.styled';
import FoodService from './FoodService';
import { Food } from './FoodInterface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalorieCalculation = () => {
	const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
	const [suggestions, setSuggestions] = useState<Food[]>([]);

	const foodService = new FoodService();

	useEffect(() => {
		const fetchData = async () => {
			const apiSuggestions = await foodService.getFoodFromApi();

			setSuggestions(apiSuggestions);
		};

		fetchData();
	}, []);

	const handleSelectChange = useCallback((selectedItems: any) => {
		setSelectedFoods(selectedItems);
	}, []);

	const saveDiet = useCallback(async () => {
		try {
			await foodService.saveDiet(selectedFoods);
			toast.success('Dieta salva com sucesso!');
		} catch (error) {
			toast.error('Houve um erro ao salvar a dieta.');
		}
	}, [selectedFoods]);

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

	const options = suggestions.map((item) => ({
		value: item.id,
		label: item.name,
		calories: item.calories,
		protein: item.protein,
		carbohydrates: item.carbohydrates,
		fat: item.fat,
	}));

	return (
		<MainContainer>
			<InputContainer>
				<Heading as="h3" size="md" padding={3}>
					Selecione algum alimento
				</Heading>
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
			</InputContainer>

			<ListContainer>
				<Heading as="h3" size="md">
					Alimentos Selecionados:
				</Heading>
				<Box overflowY="auto" padding="4" maxWidth="100%">
					<VStack spacing={2} align="stretch">
						{selectedFoods.map((food) => (
							<Box
								key={food.id}
								padding="4"
								boxShadow="md"
								_hover={{ bg: 'gray.300' }}
								cursor="pointer"
								w="full"
							>
								<Flex justifyContent="space-between" gap="2">
									<Text fontWeight="bold">{food.name}</Text>
									<Text as="span" color="teal.600">
										{food.calories
											.toFixed(2)
											.replace('.', ',')}{' '}
										kcal
									</Text>
									<Text as="span" color="orange.500">
										{food.protein
											.toFixed(2)
											.replace('.', ',')}{' '}
										g
									</Text>
									<Text as="span" color="green.500">
										{food.carbohydrates
											.toFixed(2)
											.replace('.', ',')}{' '}
										g
									</Text>
									<Text as="span" color="red.500">
										{food.fat.toFixed(2).replace('.', ',')}{' '}
										g
									</Text>
								</Flex>
							</Box>
						))}
					</VStack>
				</Box>
			</ListContainer>

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
		</MainContainer>
	);
};

export default CalorieCalculation;
