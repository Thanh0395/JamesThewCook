using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class SubmissionContest
    {
        public SubmissionContest()
        {
            Ratings = new HashSet<Rating>();
        }

        public int ScId { get; set; }
        public int? UId { get; set; }
        public int? ContestId { get; set; }
        public decimal? AverageScore { get; set; }
        public string? Title { get; set; }
        public string? Ingredients { get; set; }
        public string? Image { get; set; }
        public string? Content { get; set; }

        public virtual Contest? Contest { get; set; }
        public virtual User? UIdNavigation { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
    }
}
