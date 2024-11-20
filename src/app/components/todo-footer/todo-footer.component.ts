import { Component, computed, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { RouterLink } from "@angular/router";
import { Location } from "@angular/common";

@Component({
	selector: "app-todo-footer",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./todo-footer.component.html",
	styleUrl: "./todo-footer.component.scss",
})
export class TodoFooterComponent {
	private todoService = inject(TodoService);
	private location = inject(Location);
	activeTodosCount = this.todoService.activeTodosCount;
	allTodosCount = this.todoService.allTodosCount;
	someTodoComleted = this.todoService.someTodoComleted;
	activeTodosText = computed(
		() =>
			`${this.activeTodosCount()} ${this.activeTodosCount() === 1 ? "item" : "items"} left`,
	);

	clearCompleted() {
		this.todoService.clearCompleted();
	}

	get path(): string {
		return this.location.path().split("/")[1] || "all";
	}
}
