using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class RecipeFeedback
    {
        public int RfbId { get; set; }
        public int? UId { get; set; }
        public int? RId { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Recipe? RIdNavigation { get; set; }
        public virtual User? UIdNavigation { get; set; }
    }
}
