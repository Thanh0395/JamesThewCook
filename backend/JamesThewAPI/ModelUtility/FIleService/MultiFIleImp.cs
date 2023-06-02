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
        public async Task<ImgRecipe> CreateMultiImage(List<IFormFile> files, int rId)
		{
			var recipeDb = await _dbContext.Recipes.FindAsync(rId);
			var listImage = await _dbContext.ImgRecipes.ToListAsync();
			if(recipeDb != null)
			{
				if(files.Count > 0)
				{
					foreach (var file in files)
					{
						foreach (var image in listImage)
						{
							if (file.FileName.Equals(Path.GetFileName(image.FeatureImage)))
							{

							}
							else
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
									return imageNew;
								}
								else
								{
									return null;
								}
							}
						}
					}
				}
			}
			else
			{
				return null;
			}
			return null;
		}

		public async Task<ImgRecipe> GetImageRecipeByRecipeId(int rId)
		{
			var recipeDb = _dbContext.Recipes.FindAsync(rId);
			if(recipeDb != null)
			{
				var imageFirstofRid = _dbContext.ImgRecipes.FirstOrDefault(img => img.RId == rId);
				return imageFirstofRid;
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
	}
}
