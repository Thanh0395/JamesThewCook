using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface ICategory
    {
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task<Category> GetCategoryAsync(int CId);
        Task<Category> AddCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(Category category);
        Task<bool> DeleteCategoryAsync(int CId);
    }
}
