export interface TodoDto {
	title: string;
	completed: boolean;
}

export interface Todo extends TodoDto {
	id: string;
}
