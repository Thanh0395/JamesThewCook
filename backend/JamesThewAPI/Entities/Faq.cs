using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Faq
    {
        public int FaqId { get; set; }
        public string? Question { get; set; }
        public string? Asked { get; set; }
    }
}
