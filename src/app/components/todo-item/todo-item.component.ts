import {
	Component,
	type ElementRef,
	inject,
	input,
	signal,
	ViewChild,
} from "@angular/core";
import type { Todo } from "../../interfaces/todo";
import { TodoService } from "../../services/todo.service";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-todo-item",
	imports: [FormsModule],
	templateUrl: "./todo-item.component.html",
	styleUrl: "./todo-item.component.scss",
})
export class TodoItemComponent {
	private todoService = inject(TodoService);
	todo = input.required<Todo>();
	isEditing = signal(false);
	title = "";

	@ViewChild("todoInputRef") inputRef?: ElementRef;

	toggleTodo() {
		const todo: Todo = {
			...this.todo(),
			completed: !this.todo().completed,
		};
		this.todoService.updateTodo(todo);
	}

	updateTitle() {
		const todo: Todo = {
			...this.todo(),
			title: this.title,
		};
		this.todoService.updateTodo(todo);
		this.isEditing.set(false);
	}

	startEdit() {
		this.isEditing.set(true);
	}

	deleteTodo() {
		this.todoService.deleteTodo(this.todo().id);
	}

	handleFocus() {
		this.title = this.todo().title;
	}

	handleBlur() {
		this.isEditing.set(false);
	}

	ngAfterViewChecked(): void {
		if (this.isEditing()) {
			this.inputRef?.nativeElement.focus();
		}
	}
}
