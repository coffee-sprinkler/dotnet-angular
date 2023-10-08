global using AutoMapper;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.TodoService
{
    public class TodoService : ITodoService
    {
        private static List<Todo> tasks = new List<Todo> {
            new Todo(),
            new Todo { Id = 1, Description = "Working on Backend!" }
        };

        private bool IsTodoDtoEmpty(AddTodoDto todoDto)
        {
            return todoDto.Description == null &&
                todoDto.BackgroundColor == null &&
                !todoDto.IsDeleted &&
                todoDto.Class == default(TagsClass);
        }

        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public TodoService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetTodoDto>>> AddTodo(AddTodoDto newTodo)
        {
            var response = new ServiceResponse<List<GetTodoDto>>();

            if (IsTodoDtoEmpty(newTodo))
            {
                response.Success = false;
                response.Message = "Cannot add an empty Todo.";
                return response;
            }
            try {

                var todo = _mapper.Map<Todo>(newTodo);
                _context.Todos.Add(todo);
                await _context.SaveChangesAsync();

                var dbTodos = await _context.Todos.ToListAsync();
                response.Data = dbTodos.Select(t => _mapper.Map<GetTodoDto>(t)).ToList();
            } 
            catch (Exception err)
            {
                response.Success = false;
                response.Message = err.Message;
            }

            return response;
        }

        
        public async Task<ServiceResponse<List<GetTodoDto>>> DeleteTodo(int id) 
        {
            var response = new ServiceResponse<List<GetTodoDto>>();
            try 
            {
                var todo = await _context.Todos.FindAsync(id);

                if (todo is null)
                    throw new Exception("Todo not found.");
                
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();


                var dbTodos = await _context.Todos.ToListAsync();
                response.Data = dbTodos.Select(t => _mapper.Map<GetTodoDto>(t)).ToList();
            } 
            catch (Exception err) 
            {
                response.Success = false;
                response.Message = err.Message;
            }
            return response;
        }

        public async Task<ServiceResponse<List<GetTodoDto>>> GetAllTodos() 
        {
            var response = new ServiceResponse<List<GetTodoDto>>();
            var dbTodos = await _context.Todos.ToListAsync();
            response.Data = dbTodos.Select(t => _mapper.Map<GetTodoDto>(t)).ToList();
            return response;
        }

        public async Task<ServiceResponse<GetTodoDto>> GetTodoById(int id)
        {
            var response = new ServiceResponse<GetTodoDto>();
            var dbTodos = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id);
            response.Data = _mapper.Map<GetTodoDto>(dbTodos);
            return response;
        }

        public async Task<ServiceResponse<GetTodoDto>> UpdateTodo(UpdateTodoDto updateTodo)
        {
            var response = new ServiceResponse<GetTodoDto>();
            try 
            {
                var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == updateTodo.Id);

                if (todo is null)
                    throw new Exception("Todo not found.");
                
                todo.Description = updateTodo.Description;
                todo.BackgroundColor = updateTodo.BackgroundColor;
                todo.IsDeleted = updateTodo.IsDeleted;
                todo.Class = updateTodo.Class;

                await _context.SaveChangesAsync();

                response.Data = _mapper.Map<GetTodoDto>(todo);
            } 
            catch (Exception err) 
            {
                response.Success = false;
                response.Message = err.Message;
            }
            return response;
        }


    }
}