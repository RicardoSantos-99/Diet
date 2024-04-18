import styled from 'styled-components';

export const Container = styled.nav`
	width: 80%;
	margin: 50px auto 0 auto;
	background-color: green;
	border-radius: 30px;
	height: 250px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const MainContainer = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
	border-radius: 12px;

	@media (max-width: 1550px) {
		margin: 50px 0;
		width: 90%;
		min-height: 300px;
		height: 100%;
	}
`;
export const ContainerInput = styled.div`
	width: 180px;
	margin-right: 35px;
`;

export const InputField = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	background-color: #f0f0f0;
	color: #000;
`;

export const InputName = styled.p`
	font-size: 16px;
	font-weight: 700;
	text-align: center;
`;
export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: end;
	margin-bottom: 10px;
`;
