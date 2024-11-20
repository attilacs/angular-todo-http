import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import type { Todo, TodoDto } from "../interfaces/todo";
import { finalize, forkJoin } from "rxjs";

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

	isAllCompleted = computed<boolean>(() =>
		this.todosLoaded().every((todo) => todo.completed),
	);

	allTodosCount = computed<number>(() => this.todosLoaded().length);

	activeTodosCount = computed<number>(
		() => this.todosLoaded().filter((todo) => !todo.completed).length,
	);

	someTodoComleted = computed<boolean>(() =>
		this.todosLoaded().some((todo) => todo.completed),
	);

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

	addTodo(title: string): void {
		const todo: TodoDto = {
			title,
			completed: false,
		};
		this.initLoading();
		this.http
			.post<Todo>(this.apiUrl, todo)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				}),
			)
			.subscribe({
				next: (todo: Todo) => {
					this.todosLoaded.set([...this.todosLoaded(), todo]);
				},
				error: () => {
					this.errorMessage.set("Failed to add todo.");
				},
			});
	}

	updateTodo(todo: Todo) {
		this.initLoading();
		this.http
			.put(`${this.apiUrl}/${todo.id}`, todo)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				}),
			)
			.subscribe({
				next: () => {
					const updatedTodos = this.todosLoaded().map((t) =>
						t.id === todo.id ? todo : t,
					);
					this.todosLoaded.set(updatedTodos);
				},
				error: () => {
					this.errorMessage.set("Failed to update todo.");
				},
			});
	}

	toggleAll(completed: boolean) {
		const todos = this.todosLoaded().map((todo) => ({ ...todo, completed }));
		const updateRequests = todos.map((todo) =>
			this.http.put(`${this.apiUrl}/${todo.id}`, todo),
		);
		forkJoin(updateRequests).subscribe({
			next: () => {
				this.todosLoaded.set(todos);
				this.isLoading.set(false);
			},
			error: () => {
				this.errorMessage.set("Failed to update todos.");
				this.isLoading.set(false);
			},
		});
	}

	deleteTodo(id: string): void {
		this.initLoading();
		this.http
			.delete(`${this.apiUrl}/${id}`)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				}),
			)
			.subscribe({
				next: () => {
					const updatedTodos = this.todosLoaded().filter(
						(todo) => todo.id !== id,
					);
					this.todosLoaded.set(updatedTodos);
				},
				error: () => {
					this.errorMessage.set("Failed to delete todo.");
				},
			});
	}

	clearCompleted() {
		const completedTodos = this.todosLoaded().filter((todo) => todo.completed);
		const comletedIds = completedTodos.map((todo) => todo.id);
		const deleteRequests = completedTodos.map((todo) =>
			this.http.delete(`${this.apiUrl}/${todo.id}`),
		);
		forkJoin(deleteRequests).subscribe({
			next: () => {
				const updatedTodos = this.todosLoaded().filter(
					(todo) => !comletedIds.includes(todo.id),
				);
				this.todosLoaded.set(updatedTodos);
				this.isLoading.set(false);
			},
			error: () => {
				this.errorMessage.set("Failed to delete todos.");
				this.isLoading.set(false);
			},
		});
	}

	private initLoading(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);
	}
}
