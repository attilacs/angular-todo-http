import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import type { Todo, TodoDto } from "../interfaces/todo";
import { finalize } from "rxjs";

interface LoadingState {
	isLoading: boolean;
	error: string | null;
}

@Injectable({
	providedIn: "root",
})
export class TodoService {
	private http = inject(HttpClient);
	private readonly apiUrl = "http://localhost:3000/todos";
	private todosLoaded = signal<Todo[]>([]);
	private errorMessage = signal<string | null>(null);
	private isLoading = signal<boolean>(false);

	todos = this.todosLoaded.asReadonly();

	status = computed<LoadingState>(() => ({
		isLoading: this.isLoading(),
		error: this.errorMessage(),
	}));

	getTodos(): void {
		this.initLoading();
		this.http
			.get<Todo[]>(this.apiUrl)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				}),
			)
			.subscribe({
				next: (todos) => {
					this.todosLoaded.set(todos);
				},
				error: () => {
					this.errorMessage.set("Failed to load todos.");
				},
			});
	}


	private initLoading(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);
	}
}
