import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

import FoodService from '../CalorieCalculation/FoodService';
import { Food } from '../CalorieCalculation/FoodInterface';

interface FoodContextType {
	foods: Food[];
	addFood: (food: Food) => void;
	addWater: (water: number) => void;
	fetchFoods: () => void;
	waterIntake: number;
}

const FoodContext = createContext<FoodContextType>({
	foods: [],
	addFood: () => {},
	addWater: () => {},
	fetchFoods: () => {},
	waterIntake: 0,
});

export const FoodProvider = ({ children }: { children: ReactNode }) => {
	const [foods, setFoods] = useState<Food[]>([]);
	const [waterIntake, setWaterIntake] = useState<number>(0);
	const foodService = new FoodService();

	useEffect(() => {
		fetchFoods();
	}, []);

	const fetchFoods = async () => {
		const apiFoods = await foodService.getFoodFromApi();
		setFoods(
			apiFoods.map((food) => ({
				...food,
				label: food.name,
				value: food.id.toString(),
			})),
		);
	};

	const addWater = (water: number) => {
		setWaterIntake(water);
	};

	const addFood = async (food: Food) => {
		try {
			await foodService.createFood(food);
			setFoods((prevFoods) => [...prevFoods, food]);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<FoodContext.Provider
			value={{ foods, addFood, fetchFoods, addWater, waterIntake }}
		>
			{children}
		</FoodContext.Provider>
	);
};

export function useFood() {
	return useContext(FoodContext);
}
