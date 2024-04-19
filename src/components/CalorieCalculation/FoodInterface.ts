export interface Food {
	id: string;
	name: string;
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
}
export interface ExtendedFood extends Food {
	label: string;
	value: string;
}
