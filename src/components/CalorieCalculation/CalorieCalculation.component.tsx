import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Autosuggest from 'react-autosuggest';
import { MainContainer,
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
      const apiSuggestions = await foodService.getFoodFromApi()
      setSuggestions(apiSuggestions);
    };

    fetchData();
  }, []);

  const getSuggestions = useCallback((inputValue: string): Food[] => {
    return foodService.getFilteredFoods(suggestions, inputValue);

  }, [suggestions]);

  const onChange = useCallback((_event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
    setInputValue(newValue);
  }, []);

  const onSuggestionSelected = useCallback((_event: any, { suggestion }: { suggestion: Food }) => {
    setSelectedFoods(current => current.length < 17 ? [...current, suggestion] : current);
    setInputValue('');
  }, []);

  const renderSuggestion = useCallback((suggestion: Food) => (
    <div style={{color: 'red'}}>
      {suggestion.name}
    </div>
  ), []);

  const removeSelectedFood = useCallback((index: string) => {
    setSelectedFoods(current => {
      const newSelectedFoods = [...current];
      const indexToRemove = newSelectedFoods.findIndex(food => food.id === index);
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

  const totalNutrition = useMemo(() => foodService.calculateTotalNutrition(selectedFoods), [selectedFoods]);

  return (
    <MainContainer>
      <InputContainer>
        <h3>Selecione algum alimento</h3>
        <Autosuggest
          suggestions={getSuggestions(inputValue)}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {}}
          getSuggestionValue={suggestion => suggestion.name}
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
              listStyleType: 'none' }
           }}
        />
      </InputContainer>

      <ListContainer>
        <h3>Alimentos Selecionados:</h3>
        <div>
          {selectedFoods.map((food, _index) => (
            <ListFoods key={food.id} onClick={() => removeSelectedFood(food.id)}>
              <TextFood>{food.name}</TextFood> - 
              {' '}<TextCalories>{food.calories.toFixed(2).replace('.', ',')} kcal</TextCalories> - 
              {' '}<TextProtein>{food.protein.toFixed(2).replace('.', ',')} g</TextProtein> - 
              {' '}<TextCarbohydrates>{food.carbohydrates.toFixed(2).replace('.', ',')} g</TextCarbohydrates> -
              {' '}<TextFat>{food.fat.toFixed(2).replace('.', ',')} g</TextFat>
            </ListFoods>
          ))}
        </div>
      </ListContainer>

      <TableContainer>
        <h3>Valor Nutricional:</h3>
        <Information>
          <Nutricional>
            Calorias: <TextCalories>{totalNutrition.calories} kcal</TextCalories>
          </Nutricional>
          <Nutricional>
            Proteína: <TextProtein>{totalNutrition.protein} g</TextProtein>
          </Nutricional>
          <Nutricional>
            Carboidratos: <TextCarbohydrates>{totalNutrition.carbohydrates} g</TextCarbohydrates>
          </Nutricional>
          <Nutricional>
            Gordura: <TextFat>{totalNutrition.fat} g</TextFat>
          </Nutricional>
        </Information>
        <SaveButton onClick={saveDiet}>
          Salvar Dieta
        </SaveButton>
        <ToastContainer />
      </TableContainer>
    </MainContainer>
  );
};

export default CalorieCalculation;
