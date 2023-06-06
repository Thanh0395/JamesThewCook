using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class ImgRecipe
    {
        public int ImgRecipeId { get; set; }
        public int? RId { get; set; }
        public string? FeatureImage { get; set; }

        public virtual Recipe? RIdNavigation { get; set; }
    }
}
