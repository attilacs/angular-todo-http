import { Component } from "@angular/core";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoHeaderComponent } from "./components/todo-header/todo-header.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [TodoHeaderComponent, TodoListComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	title = "Todos";
}
