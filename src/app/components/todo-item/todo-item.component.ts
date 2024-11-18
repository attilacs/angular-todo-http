import { Component, input } from "@angular/core";
import type { Todo } from "../../interfaces/todo";

@Component({
	selector: "app-todo-item",
	standalone: true,
	imports: [],
	templateUrl: "./todo-item.component.html",
	styleUrl: "./todo-item.component.scss",
})
export class TodoItemComponent {
	todo = input.required<Todo>();
}
