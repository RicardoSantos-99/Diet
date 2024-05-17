import {
	GithubAuthProvider,
	GoogleAuthProvider,
	TwitterAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { toast } from 'react-toastify';

export const signInWithGitHub = async (navigate: any) => {
	const provider = new GithubAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		toast.success('Login com GitHub bem-sucedido!');
		navigate('/');
	} catch (error) {
		console.error(error);
		toast.error('Erro ao fazer login com GitHub.');
	}
};

export const signInWithGoogle = async (navigate: any) => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		toast.success('Login com Google bem-sucedido!');
		navigate('/');
	} catch (error) {
		console.error(error);
		toast.error('Erro ao fazer login com Google.');
	}
};

export const signInWithTwitter = async (navigate: any) => {
	const provider = new TwitterAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		toast.success('Login com Twitter bem-sucedido!');
		navigate('/');
	} catch (error) {
		console.error(error);
		toast.error('Erro ao fazer login com Twitter.');
	}
};
