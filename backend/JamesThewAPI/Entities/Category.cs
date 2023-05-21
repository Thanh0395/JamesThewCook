using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Category
    {
        public Category()
        {
            Posts = new HashSet<Post>();
        }

        public int CId { get; set; }
        public string? CategoryName { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
