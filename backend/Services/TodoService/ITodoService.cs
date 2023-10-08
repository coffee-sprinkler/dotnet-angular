using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.TodoService
{
    public interface ITodoService
    {
        Task<ServiceResponse<List<GetTodoDto>>> GetAllTodos();
        Task<ServiceResponse<GetTodoDto>> GetTodoById(int id);
        Task<ServiceResponse<List<GetTodoDto>>> AddTodo(AddTodoDto newTodo);
        Task<ServiceResponse<GetTodoDto>> UpdateTodo(UpdateTodoDto updatedTodo);
        Task<ServiceResponse<List<GetTodoDto>>> DeleteTodo(int id);

    }
}