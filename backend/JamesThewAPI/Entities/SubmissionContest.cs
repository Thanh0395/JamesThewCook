using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class SubmissionContest
    {
        public int ScId { get; set; }
        public int? UId { get; set; }
        public int? ContestId { get; set; }
        public decimal? Score { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }

        public virtual Contest? Contest { get; set; }
        public virtual User? UIdNavigation { get; set; }
    }
}
