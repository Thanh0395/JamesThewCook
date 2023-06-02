using JamesThewAPI.Entities;

namespace JamesThewAPI.ModelUtility.FIleService
{
	public interface IMultiFIle
	{
		Task<IEnumerable<ImgRecipe>> GetListImageRecipe();

		Task<ImgRecipe> GetImageRecipeByRecipeId(int rId);
		Task<ImgRecipe> CreateMultiImage(List<IFormFile> files, int rId);
	}
}
