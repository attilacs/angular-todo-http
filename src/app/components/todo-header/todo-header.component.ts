import { Component, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-todo-header",
	imports: [ReactiveFormsModule],
	templateUrl: "./todo-header.component.html",
	styleUrl: "./todo-header.component.scss",
})
export class TodoHeaderComponent {
	private readonly todoService = inject(TodoService);
	status = this.todoService.status;
	isAllCompleted = this.todoService.isAllCompleted;
	allTodosCount = this.todoService.allTodosCount;

	form = new FormGroup({
		title: new FormControl(""),
	});

	onEnter() {
		this.onSubmit();
	}

	onSubmit() {
		const title = this.form.value.title?.trim();
		if (!title) {
			return;
		}
		this.todoService.addTodo(title);
		this.form.reset();
	}

	toggleAll(e: Event) {
		const input = e.target as HTMLInputElement;
		this.todoService.toggleAll(input.checked);
	}
}
