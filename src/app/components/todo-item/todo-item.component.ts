import { Component, inject, input } from "@angular/core";
import type { Todo } from "../../interfaces/todo";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo-item",
	standalone: true,
	imports: [],
	templateUrl: "./todo-item.component.html",
	styleUrl: "./todo-item.component.scss",
})
export class TodoItemComponent {
	private todoService = inject(TodoService);
	todo = input.required<Todo>();

	deleteTodo() {
		this.todoService.deleteTodo(this.todo().id);
	}
}
