using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string BackgroundColor { get; set; }
        public bool IsDeleted { get; set; }
        public TagsClass Class { get; set; } = TagsClass.Ordinary;
    }
}