import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css'],
})
export class AddtodoComponent {
  newTodo: Todo = {
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
    private todoService: TodoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.toastr.success('New Todo Added!');
        this.router.navigate(['/todos']);
      },
    });
  }
}
