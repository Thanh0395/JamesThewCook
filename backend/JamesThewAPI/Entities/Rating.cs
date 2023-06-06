using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Rating
    {
        public int RatingId { get; set; }
        public int? UId { get; set; }
        public int? ScId { get; set; }
        public decimal Score { get; set; }

        public virtual SubmissionContest? Sc { get; set; }
        public virtual User? UIdNavigation { get; set; }
    }
}
