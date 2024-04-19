import styled from 'styled-components';

export const MainContainer = styled.nav`
	width: 80%;
	margin: 50px auto;
	display: flex;
	background-color: green;
	height: 540px;
	align-items: center;
	border-radius: 30px;
	justify-content: space-evenly;

	@media (max-width: 1550px) {
		flex-direction: column;
		height: 120%;
	}
`;

export const InputContainer = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 480px;
	width: 500px;
	border-radius: 12px;

	@media (max-width: 1550px) {
		margin: 50px 0;
		width: 60%;
	}
`;

export const ListContainer = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 480px;
	width: 600px;
	border-radius: 12px;

	@media (max-width: 1550px) {
		margin: 50px 0;
		width: 90%;
		min-height: 300px;
		height: 100%;
	}
`;

export const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 250px;
	height: 50%;
	-o-object-fit: contain;
	object-fit: contain;
	border-radius: 12px;
	background-color: #fff;
	padding: 20px;

	@media (max-width: 1550px) {
		margin: 50px 0;
		width: 50%;
	}
`;
export const Nutricional = styled.p`
	font-weight: 600;
	display: flex;
	justify-content: space-between;

	@media (max-width: 460px) {
		justify-content: center;
	}
`;

export const SaveButton = styled.button`
	padding: 10px 10px;
	font-size: 16px;
	cursor: pointer;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 5px;

	&:hover {
		background-color: #45a049;
	}

	@media (max-width: 460px) {
		width: 100%;
	}
`;

export const Information = styled.div`
	width: 200px;
`;
export const TextCalories = styled.span`
	color: #f1af09;
	font-weight: 700;
`;

export const TextProtein = styled.span`
	color: #27ac09;
	font-weight: 700;
`;

export const TextCarbohydrates = styled.span`
	color: #f46708;
	font-weight: 700;
`;

export const TextFat = styled.span`
	color: #b361e8;
	font-weight: 700;
`;

export const TextFood = styled.span`
	color: #000;
	font-weight: 700;
`;

export const ListFoods = styled.div`
	cursor: pointer;
`;
