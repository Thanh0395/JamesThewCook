using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Feedback
    {
        public int FbId { get; set; }
        public int? UId { get; set; }
        public int? PId { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Post? PIdNavigation { get; set; }
        public virtual User? UIdNavigation { get; set; }
    }
}
