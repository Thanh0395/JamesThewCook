using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class Country
    {
        public Country()
        {
            Recipes = new HashSet<Recipe>();
        }

        public int CountryId { get; set; }
        public string? CountryName { get; set; }

        public virtual ICollection<Recipe> Recipes { get; set; }
    }
}
