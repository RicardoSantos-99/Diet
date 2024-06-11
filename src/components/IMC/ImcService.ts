import { Profile } from './profileInterface';

class ImcService {
	async getImc(id: any): Promise<Profile[]> {
		try {
			const response = await fetch(`http://localhost:4000/api/imc/${id}`);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const { data } = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async saveImc(data: Profile): Promise<void> {
		try {
			const response = await fetch('http://localhost:4000/api/imc', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data }),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {}
	}
}

export default ImcService;
