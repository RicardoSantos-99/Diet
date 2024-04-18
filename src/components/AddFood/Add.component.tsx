import React, { useState } from 'react';
import {
	Container,
	InputField,
	MainContainer,
	ContainerInput,
	InputName,
	ButtonContainer,
} from './AddFood.styled';
import { SaveButton } from '../CalorieCalculation/CalorieCalculation.styled';
import FoodService from '../CalorieCalculation/FoodService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormAdd = () => {
	const [foodName, setFoodName] = useState<string>('');
	const [calories, setCalories] = useState<string>('');
	const [proteins, setProteins] = useState<string>('');
	const [carbohydrates, setCarbohydrates] = useState<string>('');
	const [fats, setFats] = useState<string>('');

	const validateInputs = () => {
		return (
			parseFloat(calories) > 0 &&
			parseFloat(proteins) > 0 &&
			parseFloat(carbohydrates) > 0 &&
			parseFloat(fats) > 0
		);
	};
	const resetFields = () => {
		setFoodName('');
		setCalories('');
		setProteins('');
		setCarbohydrates('');
		setFats('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateInputs()) {
			toast.error('Todos os campos devem ter valores maiores que zero.');
			return;
		}

		const foodData = {
			name: foodName,
			calories: parseFloat(calories),
			protein: parseFloat(proteins),
			carbohydrates: parseFloat(carbohydrates),
			fat: parseFloat(fats),
			id: Math.random().toString(),
		};

		try {
			const foodService = new FoodService();
			await foodService.createFood(foodData);

			toast.success('Alimento salvo com sucesso!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			resetFields();
			return;
		} catch (errors) {
			if (errors.name[0] == 'has already been taken') {
				toast.error('Esse alimento já existe.');
				return;
			}
			toast.error('Houve um erro ao salvar os dados.');
			return;
		}
	};

	return (
		<Container>
			<MainContainer>
				<h2 style={{ textAlign: 'center' }}>
					Adicione novos alimentos:
				</h2>
				<form onSubmit={handleSubmit} style={{ display: 'flex' }}>
					<ContainerInput>
						<InputName
							style={{
								color: '#000',
							}}
						>
							Nome do alimento
						</InputName>
						<InputField
							type="text"
							placeholder="Nome do Alimento"
							value={foodName}
							onChange={(e) => setFoodName(e.target.value)}
							required
						/>
					</ContainerInput>
					<ContainerInput>
						<InputName
							style={{
								color: '#f1af09',
							}}
						>
							Calorias
						</InputName>
						<InputField
							type="number"
							placeholder="Calorias"
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
							required
						/>
					</ContainerInput>
					<ContainerInput>
						<InputName
							style={{
								color: '#27ac09',
							}}
						>
							Proteínas
						</InputName>
						<InputField
							type="number"
							placeholder="Proteínas"
							value={proteins}
							onChange={(e) => setProteins(e.target.value)}
							required
						/>
					</ContainerInput>
					<ContainerInput>
						<InputName
							style={{
								color: '#f46708',
							}}
						>
							Carboidratos
						</InputName>
						<InputField
							type="number"
							placeholder="Calorias"
							value={carbohydrates}
							onChange={(e) => setCarbohydrates(e.target.value)}
							required
						/>
					</ContainerInput>
					<ContainerInput>
						<InputName
							style={{
								color: '#b361e8',
							}}
						>
							Gorduras
						</InputName>
						<InputField
							type="number"
							placeholder="Gorduras"
							value={fats}
							onChange={(e) => setFats(e.target.value)}
							required
						/>
					</ContainerInput>
					<ButtonContainer>
						<SaveButton type="submit">Salvar</SaveButton>
					</ButtonContainer>
				</form>
				<ToastContainer />
			</MainContainer>
		</Container>
	);
};

export default FormAdd;
