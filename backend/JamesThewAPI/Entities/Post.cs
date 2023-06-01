using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Post
    {
        public Post()
        {
            Feedbacks = new HashSet<Feedback>();
        }

        public int PId { get; set; }
        public int? UId { get; set; }
        public int? CId { get; set; }
        public string? FeatureImage { get; set; }
        public bool? IsFree { get; set; }
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public string? Type { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Category? CIdNavigation { get; set; }
        public virtual User? UIdNavigation { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
