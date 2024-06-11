import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { ExtendedFood } from '../CalorieCalculation/FoodInterface';
import FoodService from '../CalorieCalculation/FoodService';

const FoodCard = ({ selectedFoods }: { selectedFoods: ExtendedFood[] }) => {
	const foodService = new FoodService();

	return (
		<Box overflowY="auto" padding="2" maxWidth="100%">
			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				{selectedFoods.map((food) => (
					<Box
						key={food.id}
						padding="4"
						boxShadow="md"
						_hover={{ bg: 'gray.300' }}
						cursor="pointer"
					>
						<Flex flexDirection="column">
							<Text fontWeight="bold" textAlign="center">
								{food.label}
							</Text>
							<Flex justifyContent="space-between" gap={3}>
								<Flex
									flexDirection="column"
									alignItems="center"
								>
									<Text fontSize="xs" fontWeight="bold">
										Kcal
									</Text>
									<Text
										as="span"
										color="teal.600"
										fontSize="xs"
									>
										{foodService.formatValue(food.calories)}{' '}
										kcal
									</Text>
								</Flex>
								<Flex
									flexDirection="column"
									alignItems="center"
								>
									<Text fontSize="xs" fontWeight="bold">
										Prot
									</Text>
									<Text
										as="span"
										color="orange.500"
										fontSize="xs"
									>
										{foodService.formatValue(food.protein)}{' '}
										g
									</Text>
								</Flex>
								<Flex
									flexDirection="column"
									alignItems="center"
								>
									<Text fontSize="xs" fontWeight="bold">
										Carb
									</Text>
									<Text
										as="span"
										color="green.500"
										fontSize="xs"
									>
										{foodService.formatValue(
											food.carbohydrates,
										)}{' '}
										g
									</Text>
								</Flex>
								<Flex
									flexDirection="column"
									alignItems="center"
								>
									<Text fontSize="xs" fontWeight="bold">
										Gord
									</Text>
									<Text
										as="span"
										color="red.500"
										fontSize="xs"
									>
										{foodService.formatValue(food.fat)} g
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Box>
				))}
			</Grid>
		</Box>
	);
};

export default FoodCard;
