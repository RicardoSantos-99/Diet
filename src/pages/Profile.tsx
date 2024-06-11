import { Avatar, Box, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserImg from '../assets/user.png';
import { User } from 'firebase/auth';
import { auth } from '../firebase-config';
import Imc from '../components/IMC/ImcComponent';
import ImcChart from '../components/IMC/ImcChart';
import ImcService from '../components/IMC/ImcService';
import { Profile as ProfileData } from '../components/IMC/profileInterface';

const imcService = new ImcService();

const Profile = () => {
	const [imcData, setImcData] = useState<ProfileData[]>([]);
	const user: User = auth.currentUser;

	const fetchImcData = async () => {
		if (user) {
			const data = await imcService.getImc(user.uid);
			setImcData(data);
		}
	};

	useEffect(() => {
		fetchImcData();
	}, [user]);

	return (
		<Box
			minHeight="100vh"
			display="flex"
			mt={8}
			alignItems="start"
			justifyContent="center"
		>
			<Stack align="center">
				<Avatar size="xl" src={user.photoURL || UserImg} />
				<Heading as="h2" size="lg">
					{user.displayName}
				</Heading>
				<Imc
					user={user.uid}
					saveImc={imcService.saveImc}
					refreshImcData={fetchImcData}
				/>
				<ImcChart imcData={imcData} />
			</Stack>
		</Box>
	);
};

export default Profile;
