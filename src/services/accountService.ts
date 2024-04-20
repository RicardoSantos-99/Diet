class AccountService {
	private url = 'http://localhost:4000/api';

	async register(email: String, password: String) {
		try {
			const response = await fetch('/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Erro ao registrar usuário:', error);
			throw error;
		}
	}

	async confirm(token: String) {
		try {
			const response = await fetch(`${this.url}/users/confirm/${token}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Erro ao confirmar conta:', error);
			throw error;
		}
	}

	async login(email: string, password: string) {
		const response = await fetch(`${this.url}/users/log_in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: { email, password } }),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			const errorMessage = errorResponse.error;
			return Promise.reject(errorMessage);
		}

		const data = await response.json();
		return data;
	}
}

export default AccountService;
