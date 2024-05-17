import { useState } from 'react';
import {
	Box,
	Input,
	Button,
	Text,
	VStack,
	Container,
	HStack,
} from '@chakra-ui/react';

import { useFood } from '../components/MainMenu/foodContext';
const Recommendation = () => {
	const [weight, setWeight] = useState(0);
	const { addWater, waterIntake } = useFood();

	const calculateWaterIntake = () => {
		const intake = weight * 35;
		addWater(intake);
	};

	return (
		<Container>
			<VStack spacing={4}>
				<Text fontSize="xl" fontWeight="bold">
					Recomendação de Água
				</Text>
				<HStack spacing={4}>
					<Input
						placeholder="Digite seu peso em kg"
						value={weight}
						onChange={(e) => setWeight(Number(e.target.value))}
						type="number"
					/>
					<Button onClick={calculateWaterIntake} colorScheme="blue">
						Calcular
					</Button>
				</HStack>
				{waterIntake !== null && (
					<Text fontSize="lg">
						{waterIntake > 0
							? `Você deve beber ${waterIntake}ml de água por dia`
							: 'Por favor, insira um peso'}
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default Recommendation;
