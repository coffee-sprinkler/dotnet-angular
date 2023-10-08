import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { AddtodoComponent } from './components/addtodo/addtodo.component';
import { UpdatetodoComponent } from './components/updatetodo/updatetodo.component';
import { HometodoComponent } from './components/hometodo/hometodo.component';

const routes: Routes = [
  {
    path: '',
    component: HometodoComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'new',
    component: AddtodoComponent,
  },
  {
    path: 'update/:id',
    component: UpdatetodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
