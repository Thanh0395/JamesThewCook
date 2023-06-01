using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.AnalyticsModel;
using Microsoft.EntityFrameworkCore.Query;

namespace JamesThewAPI.Repository
{
	public interface IRecipe
	{
		Task<IEnumerable<Recipe>> GetRecipiesAsync();
		Task<Recipe> GetRecipeAsync(int rId);
		Task<Recipe> AddRecipeAsync(Recipe recipe, IFormFile file);
		Task<Recipe> UpdateRecipeAsync(Recipe recipe, IFormFile file);
		Task<bool> DeleteRecipeAsync(int rId);
		Task<IEnumerable<Recipe>> GetRecentRecipe();

		Task<IEnumerable<RecipeCategoryModel>> GetCategoryByRecipeCount();
	}
}
