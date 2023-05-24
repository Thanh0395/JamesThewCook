using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Recipe
    {
        public Recipe()
        {
            RecipeFeedbacks = new HashSet<RecipeFeedback>();
        }

        public int RId { get; set; }
        public int? UId { get; set; }
        public int? CId { get; set; }
        public int? CountryId { get; set; }
        public string? FeatureImage { get; set; }
        public bool? IsFree { get; set; }
        public string Title { get; set; } = null!;
        public string Ingredient { get; set; } = null!;
        public int? Portion { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Category? CIdNavigation { get; set; }
        public virtual Country? Country { get; set; }
        public virtual User? UIdNavigation { get; set; }
        public virtual ICollection<RecipeFeedback> RecipeFeedbacks { get; set; }
    }
}
