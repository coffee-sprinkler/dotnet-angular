import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  selectedTagClass: string = 'All';

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.filterTodos();
      },
    });
  }

  onTagClassSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTagClass = target.value;
    this.filterTodos();
  }

  filterTodos(): void {
    if (this.selectedTagClass === 'All') {
      this.filteredTodos = this.todos.filter((todo) => !todo.isDeleted);
    } else {
      this.filteredTodos = this.todos.filter(
        (todo) => !todo.isDeleted && todo.class === this.selectedTagClass
      );
    }
  }

  normalizeColor(color: string): string {
    if (color.length === 4) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return color;
  }

  deletedTodo(id: number) {
    if (confirm('Delete todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: (todos) => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
          this.filterTodos();
          this.toastr.success('Todo deleted!');
        },
      });
    }
  }
}
