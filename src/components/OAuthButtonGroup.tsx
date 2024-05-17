import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons';
import {
	signInWithGitHub,
	signInWithGoogle,
	signInWithTwitter,
} from './authProviders';
import { useNavigate } from 'react-router-dom';

const providers = [
	{
		name: 'Google',
		icon: <GoogleIcon />,
		signIn: signInWithGoogle,
		disable: false,
	},
	{
		name: 'Twitter',
		icon: <TwitterIcon />,
		signIn: signInWithTwitter,
		disable: true,
	},
	{
		name: 'GitHub',
		icon: <GitHubIcon />,
		signIn: signInWithGitHub,
		disable: false,
	},
];

export const OAuthButtonGroup = () => {
	const navigate = useNavigate();

	return (
		<ButtonGroup spacing="4" borderColor="gray.200">
			{providers.map(({ name, icon, signIn, disable }) => (
				<Button
					key={name}
					flexGrow={3}
					onClick={() => signIn(navigate)}
					isDisabled={disable}
				>
					<VisuallyHidden>Sign in with {name}</VisuallyHidden>
					{icon}
				</Button>
			))}
		</ButtonGroup>
	);
};
