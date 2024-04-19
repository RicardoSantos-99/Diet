import React, {
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
	fetchFoods: () => void;
}

const FoodContext = createContext<FoodContextType>({
	foods: [],
	addFood: () => {},
	fetchFoods: () => {},
});

export const FoodProvider = ({ children }: { children: ReactNode }) => {
	const [foods, setFoods] = useState<Food[]>([]);
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

	const addFood = async (food: Food) => {
		try {
			await foodService.createFood(food);
			setFoods((prevFoods) => [...prevFoods, food]);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<FoodContext.Provider value={{ foods, addFood, fetchFoods }}>
			{children}
		</FoodContext.Provider>
	);
};

export function useFood() {
	return useContext(FoodContext);
}
