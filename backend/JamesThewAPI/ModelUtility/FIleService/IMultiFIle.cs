using JamesThewAPI.Entities;

namespace JamesThewAPI.ModelUtility.FIleService
{
	public interface IMultiFIle
	{
		Task<IEnumerable<ImgRecipe>> GetListImageRecipe();
		Task<IEnumerable<ImgRecipe>> GetImagesByRecipeId(int rId);
		Task<bool> CreateMultiImage(List<IFormFile> files, int rId);
		Task<bool> DeleteImagesByRecipeId(int rId);
	}
}
