import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseApiUrl: string = 'http://localhost:5092/api';

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<{ data: Todo[] }>(`${this.baseApiUrl}/Todo/GetAll`)
      .pipe(map((response) => response.data));
  }

  getTodosByTagClass(tagClass: string): Observable<Todo[]> {
    const url = `${this.baseApiUrl}/Todo/GetAll/?tagClass=${tagClass}`;
    return this.http.get<Todo[]>(url);
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseApiUrl}/Todo`, newTodo);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http
      .get<{ data: Todo }>(`${this.baseApiUrl}/Todo/${id}`)
      .pipe(map((response) => response.data));
  }

  updateTodo(updateTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseApiUrl}/Todo`, updateTodo);
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.getTodoById(id).pipe(
      switchMap((delTodo: Todo) => {
        delTodo.isDeleted = true;
        return this.http.put<Todo>(`${this.baseApiUrl}/Todo`, delTodo);
      })
    );
  }
}
