import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const imcCalc = (weight: number, height: number): number => {
	const heightInMeters = height / 100;
	return weight / heightInMeters ** 2;
};

const ImcChart = ({ imcData }) => {
	const dataHistory = imcData.map((item) =>
		imcCalc(item.weight, item.height),
	);

	const labels = imcData.map((item) =>
		new Date(item.insert_at).toLocaleDateString(),
	);

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'IMC History',
				data: dataHistory,
				fill: false,
				backgroundColor: 'rgba(75,192,192,0.2)',
				borderColor: 'rgba(75,192,192,1)',
				tension: 0.1,
			},
		],
	};

	const options = {
		scales: {
			y: {
				min: 0,
				max: 50,
				title: {
					display: true,
					text: 'IMC',
				},
			},
			x: {
				title: {
					display: true,
					text: 'Meses',
				},
			},
		},
	};
	return (
		<Box
			width="100%"
			height="350px"
			mt={2}
			display="flex"
			alignItems="start"
			justifyContent="center"
		>
			<Line data={data} options={options} />
		</Box>
	);
};

export default ImcChart;
