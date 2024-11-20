import { Component, computed, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo-footer",
	standalone: true,
	imports: [],
	templateUrl: "./todo-footer.component.html",
	styleUrl: "./todo-footer.component.scss",
})
export class TodoFooterComponent {
	private todoService = inject(TodoService);
	activeTodosCount = this.todoService.activeTodosCount;
	allTodosCount = this.todoService.allTodosCount;
	activeTodosText = computed(
		() =>
			`${this.activeTodosCount()} ${this.activeTodosCount() === 1 ? "item" : "items"} left`,
	);
}
