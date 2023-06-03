using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.ModelUtility.FIleService
{
	public class MultiFIleImp : IMultiFIle
	{
		private readonly string _uploadFolder;
		private readonly ProjectS3Context _dbContext;
		private string componentPath = "/Images/Recipe";
		public MultiFIleImp(IWebHostEnvironment webHostEnvironment, ProjectS3Context dbContext)
        {
			this._dbContext = dbContext;
			_uploadFolder = Path.Combine(webHostEnvironment.ContentRootPath, "Public");
			if (!Directory.Exists(_uploadFolder))
			{
				Directory.CreateDirectory(_uploadFolder);
			}
		}
		public async Task<bool> CreateMultiImage(List<IFormFile> files, int rId)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(rId);
			var listImage = await _dbContext.ImgRecipes.ToListAsync();

			if (recipeDb != null)
			{
				if (files.Count > 0)
				{
					foreach (var file in files)
					{
						if (!listImage.Any(image => file.FileName.Equals(Path.GetFileName(image.FeatureImage))))
						{
							string extension = Path.GetExtension(file.FileName).ToLower();
							if (extension == ".png" || extension == ".jpg" || extension == ".jfif")
							{
								string fileName = Path.GetFileName(file.FileName);
								string filePath = Path.Combine(_uploadFolder + componentPath, fileName);

								using (var stream = new FileStream(filePath, FileMode.Create))
								{
									await file.CopyToAsync(stream);
								}

								var imageNew = new ImgRecipe
								{
									RId = rId,
									FeatureImage = "/Public" + componentPath + "/" + fileName,
								};

								await _dbContext.ImgRecipes.AddAsync(imageNew);
								await _dbContext.SaveChangesAsync();
							}
							else
							{
								return false;
							}
						}
					}

					return true;
				}

				return true;
			}
			else
			{
				return false;
			}

			return false;
		}


		public async Task<IEnumerable<ImgRecipe>> GetImagesByRecipeId(int rId)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(rId);
			if (recipeDb != null)
			{
				var images = await _dbContext.ImgRecipes.Where(img => img.RId == rId).ToListAsync();
				return images;
			}
			else
			{
				return null;
			}
		}


		public async Task<IEnumerable<ImgRecipe>> GetListImageRecipe()
		{
			return await _dbContext.ImgRecipes.ToListAsync();
		}

		public async Task<bool> DeleteImagesByRecipeId(int rId)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(rId);
			if (recipeDb != null)
			{
				var images = await _dbContext.ImgRecipes.Where(img => img.RId == rId).ToListAsync();
				if (images.Any())
				{
					foreach (var image in images)
					{
						string filePath = Path.Combine(_uploadFolder + componentPath, Path.GetFileName(image.FeatureImage));
						if (File.Exists(filePath))
						{
							File.Delete(filePath);
						}
						_dbContext.ImgRecipes.Remove(image);
					}
					await _dbContext.SaveChangesAsync();
				}
				return true;
			}
			else
			{
				return false;
			}
		}


	}
}
