using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Contest
    {
        public Contest()
        {
            SubmissionContests = new HashSet<SubmissionContest>();
        }

        public int ContestId { get; set; }
        public string? FeatureImage { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? Prize { get; set; }
        public int? Winner { get; set; }

        public virtual User? WinnerNavigation { get; set; }
        public virtual ICollection<SubmissionContest> SubmissionContests { get; set; }
    }
}
