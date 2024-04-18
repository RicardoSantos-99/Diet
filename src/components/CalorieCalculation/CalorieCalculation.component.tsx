import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
	Box,
	Button,
	Flex,
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
	TableContainer,
	Nutricional,
	SaveButton,
	Information,
	TextCalories,
	TextCarbohydrates,
	TextProtein,
	TextFat,
	ListFoods,
	TextFood,
} from './CalorieCalculation.styled';
import FoodService from './FoodService';
import { Food } from './FoodInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalorieCalculation = () => {
	const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<Food[]>([]);

	const foodService = new FoodService();

	useEffect(() => {
		const fetchData = async () => {
			const apiSuggestions = await foodService.getFoodFromApi();
			setSuggestions(apiSuggestions);
		};

		fetchData();
	}, []);

	const getSuggestions = useCallback(
		(inputValue: string): Food[] => {
			return foodService.getFilteredFoods(suggestions, inputValue);
		},
		[suggestions],
	);

	const onChange = useCallback(
		(
			_event: React.FormEvent<HTMLElement>,
			{ newValue }: { newValue: string },
		) => {
			setInputValue(newValue);
		},
		[],
	);

	const onSuggestionSelected = useCallback(
		(_event: any, { suggestion }: { suggestion: Food }) => {
			setSelectedFoods((current) =>
				current.length < 17 ? [...current, suggestion] : current,
			);
			setInputValue('');
		},
		[],
	);

	const renderSuggestion = useCallback(
		(suggestion: Food) => (
			<div style={{ color: 'red' }}>{suggestion.name}</div>
		),
		[],
	);

	const removeSelectedFood = useCallback((index: string) => {
		setSelectedFoods((current) => {
			const newSelectedFoods = [...current];
			const indexToRemove = newSelectedFoods.findIndex(
				(food) => food.id === index,
			);
			newSelectedFoods.splice(indexToRemove, 1);

			return newSelectedFoods;
		});
	}, []);

	const saveDiet = useCallback(async () => {
		try {
			await foodService.saveDiet(selectedFoods);
			toast.success('Dieta salva com sucesso!');
		} catch (error) {
			toast.error('Houve um erro ao salvar a dieta.');
		}
	}, [selectedFoods]);

	const totalNutrition = useMemo(
		() => foodService.calculateTotalNutrition(selectedFoods),
		[selectedFoods],
	);

	return (
		<MainContainer>
			<InputContainer>
				<h3>Selecione algum alimento</h3>
				<Autosuggest
					suggestions={getSuggestions(inputValue)}
					onSuggestionsFetchRequested={() => {}}
					onSuggestionsClearRequested={() => {}}
					getSuggestionValue={(suggestion) => suggestion.name}
					onSuggestionSelected={onSuggestionSelected}
					renderSuggestion={renderSuggestion}
					inputProps={{
						placeholder: 'Digite um alimento',
						value: inputValue,
						onChange: onChange,
						style: {
							background: 'lightblue',
							border: '1px solid #000',
							borderRadius: '4px',
							outline: 'none',
							color: '#000',
							listStyleType: 'none',
						},
					}}
				/>
			</InputContainer>

			<ListContainer>
				<h3>Alimentos Selecionados:</h3>

				<Box overflowY="auto" padding="4" maxWidth="100%">
					<VStack spacing={2} align="stretch">
						{selectedFoods.map((food) => (
							<Box
								key={food.id}
								onClick={() => removeSelectedFood(food.id)}
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
				<h3>Valor Nutricional:</h3>
				<Table variant="simple">
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
				<Button colorScheme="blue" onClick={saveDiet}>
					Salvar Dieta
				</Button>
				<ToastContainer />
			</Box>
		</MainContainer>
	);
};

export default CalorieCalculation;
