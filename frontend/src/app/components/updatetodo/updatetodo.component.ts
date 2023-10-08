import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-updatetodo',
  templateUrl: './updatetodo.component.html',
  styleUrls: ['./updatetodo.component.css'],
})
export class UpdatetodoComponent implements OnInit {
  updateTodo: Todo = {
    id: 0,
    description: '',
    backgroundColor: '#fff',
    isDeleted: false,
    class: '',
  };

  tags = [
    { class: 'secondary', value: 'Ordinary' },
    { class: 'success', value: 'Work' },
    { class: 'warning', value: 'Personal' },
    { class: 'info', value: 'Home' },
    { class: 'danger', value: 'Urgent' },
    { class: 'primary', value: 'Important' },
  ];

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.todoService.getTodoById(id).subscribe({
      next: (todos) => {
        this.updateTodo = todos;
      },
    });
  }

  updatedTodo() {
    this.todoService.updateTodo(this.updateTodo).subscribe({
      next: (todo) => {
        this.toastr.success('Todo Updated!');
        this.router.navigate(['/todos']);
      },
    });
  }
}
