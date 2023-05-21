using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Membership
    {
        public int MsId { get; set; }
        public int? UId { get; set; }
        public bool? IsMembership { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual User? UIdNavigation { get; set; }
    }
}
