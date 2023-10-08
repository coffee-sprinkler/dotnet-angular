using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Todo
{
    public class AddTodoDto
    {
        public string Description { get; set; }
        public string BackgroundColor { get; set; }
        public bool IsDeleted { get; set; }
        public TagsClass Class { get; set; }
    }
}