import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons';
import React from 'react';

const providers = [
	{ name: 'Google', icon: <GoogleIcon /> },
	{ name: 'Twitter', icon: <TwitterIcon /> },
	{ name: 'GitHub', icon: <GitHubIcon /> },
];

export const OAuthButtonGroup = () => (
	<ButtonGroup spacing="4" borderColor="gray.200">
		{providers.map(({ name, icon }) => (
			<Button key={name} flexGrow={3}>
				<VisuallyHidden>Sign in with {name}</VisuallyHidden>
				{icon}
			</Button>
		))}
	</ButtonGroup>
);
