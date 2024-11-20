import { Component, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Location } from "@angular/common";

@Component({
	selector: "app-todo-list",
	standalone: true,
	imports: [TodoItemComponent],
	templateUrl: "./todo-list.component.html",
	styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent {
	private readonly todoService = inject(TodoService);
	private location = inject(Location);
	status = this.todoService.status;

	get todos() {
		const path = this.location.path().split("/")[1] || "all";
		return this.todoService.filterTodos(path);
	}
}
