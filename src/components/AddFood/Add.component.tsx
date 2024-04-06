import React, { useState } from 'react';
import { Container, InputField, MainContainer, ContainerInput, InputName, ButtonContainer  } from './AddFood.styled';
import { SaveButton } from '../CalorieCalculation/CalorieCalculation.styled';

const FormAdd = () => {
  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [proteins, setProteins] = useState<string>('');
  const [Carbohydrates, setCarbohydrates] = useState<string>('');
  const [fats, setFats] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (parseFloat(calories) < 1 || parseFloat(Carbohydrates) < 1 || parseFloat(proteins) < 1 || parseFloat(fats) < 1) {
      alert("Os valores de calorias, proteínas e gorduras devem ter no mínimo 1 grama");
      return;
    }

    console.log(`Nome do Alimento: ${foodName}, Calorias: ${calories}, Proteinas: ${proteins}, Carboidratos: ${Carbohydrates}, Gorduras: ${fats}`);
  };

  return (
    <Container>
        <MainContainer>
        <h2 style={{textAlign: 'center'}}>Adicione novos alimentos:</h2>
        <form onSubmit={handleSubmit} style={{display: 'flex'}}>
            <ContainerInput>
                <InputName style={{color: '#000'}}>Nome do alimento</InputName>
                <InputField
                    type="text"
                    placeholder="Nome do Alimento"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                />
            </ContainerInput>
            <ContainerInput>
                <InputName style={{color: '#f1af09'}}>Calorias</InputName>
                <InputField
                    type="number"
                    placeholder="Calorias"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                />
            </ContainerInput>
             <ContainerInput>
                <InputName style={{color: '#27ac09'}}>Proteínas</InputName>
                <InputField
                    type="number"
                    placeholder="Proteinas"
                    value={proteins}
                    onChange={(e) => setProteins(e.target.value)}
                    required
                />
            </ContainerInput>
            <ContainerInput>
                <InputName style={{color: '#f46708'}}>Carboidratos</InputName>
                <InputField
                    type="number"
                    placeholder="Calorias"
                    value={Carbohydrates}
                    onChange={(e) => setCarbohydrates(e.target.value)}
                    required
                />
            </ContainerInput>
            <ContainerInput>
                <InputName style={{color: '#b361e8'}}>Gorduras</InputName>
                <InputField
                    type="number"
                    placeholder="Gorduras"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    required
                />
            </ContainerInput>
            <ButtonContainer><SaveButton type="submit">Salvar</SaveButton></ButtonContainer>
        </form>
        </MainContainer>
    </Container>
  );
};

export default FormAdd;
