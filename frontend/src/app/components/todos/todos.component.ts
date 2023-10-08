import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  selectedTagClass: string = 'All';
  isDeleted: boolean = false;
  filterTodoText: string = '';
  private searchTerms = new Subject<string>();

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isDeleted = false;

    this.route.queryParams.subscribe((params) => {
      this.isDeleted = params['isDeleted'] === 'true';
      this.completedTodos();
    });

    this.searchTerms
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.searchTodo();
      });
  }

  completedTodos(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        if (this.isDeleted) {
          this.filteredTodos = this.todos.filter((todo) => todo.isDeleted);
        } else {
          this.filteredTodos = this.todos.filter((todo) => !todo.isDeleted);
        }
      },
    });
  }

  filterCompletedTodos(): void {
    if (this.selectedTagClass === 'All') {
      this.filteredTodos = this.todos.filter((todo) => todo.isDeleted);
    } else {
      this.filteredTodos = this.todos.filter(
        (todo) => todo.isDeleted && todo.class === this.selectedTagClass
      );
    }
  }

  onTagClassSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTagClass = target.value;
    this.filterTodos();
  }

  filterTodos(): void {
    if (this.isDeleted) {
      this.filteredTodos = this.filterDeletedTodosByTagClass();
    } else {
      this.filteredTodos = this.filterActiveTodosByTagClass();
    }
  }

  private filterDeletedTodosByTagClass(): Todo[] {
    if (this.selectedTagClass === 'All') {
      return this.todos.filter((todo) => todo.isDeleted);
    }
    return this.todos.filter(
      (todo) => todo.isDeleted && todo.class === this.selectedTagClass
    );
  }

  private filterActiveTodosByTagClass(): Todo[] {
    if (this.selectedTagClass === 'All') {
      return this.todos.filter((todo) => !todo.isDeleted);
    }
    return this.todos.filter(
      (todo) => !todo.isDeleted && todo.class === this.selectedTagClass
    );
  }

  filterTodoTextMatch(todo: Todo): boolean {
    return todo.description
      .toLowerCase()
      .includes(this.filterTodoText.toLowerCase());
  }

  normalizeColor(color: string): string {
    if (color.length === 4) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return color;
  }

  deletedTodo(id: number) {
    if (confirm('Delete todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.filterTodos();
        this.toastr.success('Todo deleted!');
      });
    }
  }

  getTextColor(backgroundColor: string): string {
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const rgbRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/;

    let match =
      backgroundColor.match(hexRegex) || backgroundColor.match(rgbRegex);

    if (match && match.length >= 4) {
      const r = parseInt(match[1], 16) || parseInt(match[1], 10);
      const g = parseInt(match[2], 16) || parseInt(match[2], 10);
      const b = parseInt(match[3], 16) || parseInt(match[3], 10);

      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      return luminance > 200 ? 'black' : 'white';
    } else {
      console.error('Invalid backgroundColor format:', backgroundColor);
      return 'black';
    }
  }

  searchTodo(): void {
    this.filterTodos();
  }

  onInputChange(): void {
    this.searchTerms.next(this.filterTodoText);
  }
}
