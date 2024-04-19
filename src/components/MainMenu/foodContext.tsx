import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Food } from '../CalorieCalculation/FoodInterface';
import FoodService from '../CalorieCalculation/FoodService';

interface FoodContextType {
	foods: Food[];
	addFood: (food: Food) => void;
}
const FoodContext = createContext<FoodContextType>({
	foods: [],
	addFood: () => {},
});

export function useFood() {
	return useContext(FoodContext);
}

export const FoodProvider = ({ children }: { children: ReactNode }) => {
	const [foods, setFoods] = useState<Food[]>([]);
	const foodService = new FoodService();

	const addFood = async (food: Food) => {
		try {
			await foodService.createFood(food);
			setFoods((prevFoods) => [...prevFoods, food]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FoodContext.Provider value={{ foods, addFood }}>
			{children}
		</FoodContext.Provider>
	);
};
