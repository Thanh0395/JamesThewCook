using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.FIleService;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
	public class RecipeImp : IRecipe
	{
		private readonly ProjectS3Context _dbContext;
		private readonly IFileUpload _interfaceFileUpload; 
		private string componentPath = "/Images/Recipe";
		public RecipeImp(ProjectS3Context dbContext, IFileUpload interfaceFileUpload)
		{
			_dbContext = dbContext;
			_interfaceFileUpload = interfaceFileUpload;
		}
		public async Task<Recipe> AddRecipeAsync(Recipe recipe, IFormFile file)
		{
			if(recipe != null)
			{
				if (file != null)
				{
					var fileName = await _interfaceFileUpload.UploadFile(file, componentPath);
					if (fileName != null)
					{
						recipe.FeatureImage = "/Public" + componentPath + "/" + fileName;
					}
					else
					{
						recipe.FeatureImage = "defaultImage";
					}
				}
				await _dbContext.Recipes.AddAsync(recipe);
				await _dbContext.SaveChangesAsync();
				return recipe;
				//await _dbContext.Recipes.AddAsync(recipe);
				//await _dbContext.SaveChangesAsync();
				//return recipe;
			}
			else
			{
				return null;
			}
		}

		public async Task<bool> DeleteRecipeAsync(int rId)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(rId);
			if (recipeDb != null)
			{
				if (!string.IsNullOrEmpty(recipeDb.FeatureImage))
				{
					bool resultDeleteFileExist = await _interfaceFileUpload.DeleteFile(recipeDb.FeatureImage, componentPath);
					if (resultDeleteFileExist == true)
					{
						_dbContext.Recipes.Remove(recipeDb);
						await _dbContext.SaveChangesAsync();
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					_dbContext.Recipes.Remove(recipeDb);
					await _dbContext.SaveChangesAsync();
					return true;
				}
			}
			else
			{
				return false;
			}

		}

		public async Task<IEnumerable<Recipe>> GetRecipiesAsync()
		{
			return await _dbContext.Recipes.ToListAsync();
		}

		public async Task<Recipe> GetRecipeAsync(int rId)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(rId);
			return (recipeDb != null) ? recipeDb : null;
		}

		public async Task<Recipe> UpdateRecipeAsync(Recipe recipe, IFormFile file)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(recipe.RId);
			if (recipeDb != null)
			{
				if(file != null)
				{
					var fileName = await _interfaceFileUpload.UploadFile(file, componentPath);
					if (!string.IsNullOrEmpty(recipeDb.FeatureImage))
					{
						bool resultDeleteFileExist = await _interfaceFileUpload.DeleteFile(recipeDb.FeatureImage, componentPath);
						if (resultDeleteFileExist == true)
						{
							if (fileName != null)
							{
								recipe.FeatureImage = "/Public" + componentPath + "/" + fileName;
								_dbContext.Entry(recipe).State = EntityState.Modified;
								await _dbContext.SaveChangesAsync();
								return recipe;
							}
							else
							{
								return null;
							}
						}
						else
						{
							recipe.FeatureImage = "/Public" + componentPath + "/" + fileName;
							_dbContext.Entry(recipe).State = EntityState.Modified;
							await _dbContext.SaveChangesAsync();
							return recipe;
						}
					}
					else
					{
						recipe.FeatureImage = "/Public" + componentPath + "/" + fileName;
						_dbContext.Entry(recipe).State = EntityState.Modified;
						await _dbContext.SaveChangesAsync();
						return recipe;
					}
				}
				else
				{
					_dbContext.Entry(recipe).State = EntityState.Modified;
					await _dbContext.SaveChangesAsync();
					return recipe;
				}
			}
			else
			{
				return null;
			}
		}
	}
}
