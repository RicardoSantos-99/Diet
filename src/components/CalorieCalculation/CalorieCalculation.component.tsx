import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { MainContainer,
InputContainer, 
ListContainer, 
TableContainer, 
Nutricional, 
Information,
TextCalories,
TextCarbohydrates,
TextProtein,
TextFat,
ListFoods,
TextFood,
} from './CalorieCalculation.styled';

const CalorieCalculation = () => {
  // Lista de alimentos selecionados
  const [selectedFoods, setSelectedFoods] = useState([]);

  // Valor do input
  const [inputValue, setInputValue] = useState('');

  // Lista de alimentos sugeridos com informações nutricionais
  const suggestions = [
    { name: 'Apple', calories: 52, protein: 0.3, carbohydrates: 13.8, fat: 0.2 },
    { name: 'Banana', calories: 89, protein: 1.1, carbohydrates: 22.8, fat: 0.3 },
    { name: 'Orange', calories: 47, protein: 0.9, carbohydrates: 11.8, fat: 0.1 },
    { name: 'Pear', calories: 57, protein: 0.4, carbohydrates: 15.2, fat: 0.2 },
    { name: 'Grapes', calories: 69, protein: 0.6, carbohydrates: 18.1, fat: 0.2 },
  ];

  // Função para obter sugestões com base no valor digitado
  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.trim().toLowerCase();
    return suggestions.filter(food => food.name.toLowerCase().includes(inputValueLower));
  };

  // Função chamada ao alterar o valor do campo de entrada
  const onChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  // Função chamada ao clicar em uma sugestão
  const onSuggestionSelected = (event, { suggestion }) => {
    // Adiciona o alimento selecionado à lista de alimentos
    selectedFoods.length < 17 ? setSelectedFoods([...selectedFoods, suggestion]) : setSelectedFoods
    setInputValue(''); // Limpa o valor do input após a seleção
  };

  // Função chamada para renderizar uma sugestão
  const renderSuggestion = (suggestion) => {
    return (
      <div style={{color: 'red'}}>
        {suggestion.name}
      </div>
    );
  };

  // Função para remover um alimento selecionado
  const removeSelectedFood = (index) => {
    const newSelectedFoods = [...selectedFoods];
    newSelectedFoods.splice(index, 1);
    setSelectedFoods(newSelectedFoods);
  };

  // Calcula a soma das informações nutricionais para os alimentos selecionados
  const calculateTotalNutrition = () => {
    const total = selectedFoods.reduce((acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbohydrates += food.carbohydrates;
      acc.fat += food.fat;
      return acc;
    }, { calories: 0, protein: 0, carbohydrates: 0, fat: 0 });

    // Arredonda as informações nutricionais para duas casas decimais usando vírgula como separador decimal
    return {
      calories: total.calories.toFixed(2).replace('.', ','),
      protein: total.protein.toFixed(2).replace('.', ','),
      carbohydrates: total.carbohydrates.toFixed(2).replace('.', ','),
      fat: total.fat.toFixed(2).replace('.', ',')
    };
  };

  // Calcula as informações nutricionais totais
  const totalNutrition = calculateTotalNutrition();

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
          {selectedFoods.map((food, index) => (
            <ListFoods key={index} onClick={() => removeSelectedFood(index)}>
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
      </TableContainer>
    </MainContainer>
  );
};

export default CalorieCalculation;
