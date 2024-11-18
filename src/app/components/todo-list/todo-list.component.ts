import { Component, inject, type OnInit } from "@angular/core";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo-list",
	standalone: true,
	imports: [],
	templateUrl: "./todo-list.component.html",
	styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent implements OnInit {
	private readonly todoService = inject(TodoService);
	todos = this.todoService.todos;
	status = this.todoService.status;

	ngOnInit(): void {
		this.todoService.getTodos();
	}
}
