import { Food } from "./FoodInterface";

class FoodService {
  async getFoodFromApi(): Promise<Food[]> {
    try {
      const response = await fetch('http://localhost:4000/api/foods');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = await response.json();
      return Array.isArray(data) 
        ? data 
        : this.getFoodFromMock();

    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return this.getFoodFromMock();
    }
  }

  async saveDiet(selectedFoods: Food[]): Promise<void> {
    try {
      const response = await fetch('http://localhost:4000/api/user_foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({foods: selectedFoods}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  }

  async createFood(food: Food): Promise<Food> {
    try {
      const response = await fetch('http://localhost:4000/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({food: food}),
      });

      if (!response.ok) {
      const errorResponse = await response.json();
      const errors = errorResponse.errors;
      return Promise.reject(errors);
    }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      return data;

    } catch (error) {
      return food;
    }
  }

  getFoodFromMock(): Food[] {
    const suggestions: Food[] = [
      { name: 'Apple', calories: 52, protein: 0.3, carbohydrates: 13.8, fat: 0.2, id: '1'},
      { name: 'Banana', calories: 89, protein: 1.1, carbohydrates: 22.8, fat: 0.3, id: '2' },
      { name: 'Orange', calories: 47, protein: 0.9, carbohydrates: 11.8, fat: 0.1 , id: '3'},
      { name: 'Pear', calories: 57, protein: 0.4, carbohydrates: 15.2, fat: 0.2, id: '4' },
      { name: 'Grapes', calories: 69, protein: 0.6, carbohydrates: 18.1, fat: 0.2, id: '5' },
    ];
    return suggestions;
  }

  calculateTotalNutrition = (selectedFoods: Food[]) => {
    const total = selectedFoods.reduce((acc, food: Food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbohydrates += food.carbohydrates;
      acc.fat += food.fat;
      return acc;
    }, { calories: 0, protein: 0, carbohydrates: 0, fat: 0 });
  
    return {
      calories: total.calories.toFixed(2).replace('.', ','),
      protein: total.protein.toFixed(2).replace('.', ','),
      carbohydrates: total.carbohydrates.toFixed(2).replace('.', ','),
      fat: total.fat.toFixed(2).replace('.', ',')
    };
  }

  getFilteredFoods = (foods: Food[], inputValue: string): Food[] => {
    const inputValueLower = inputValue.trim().toLowerCase();
    return foods.filter(food => food.name.toLowerCase().includes(inputValueLower)).slice(0, 12);
  }


}

export default FoodService;