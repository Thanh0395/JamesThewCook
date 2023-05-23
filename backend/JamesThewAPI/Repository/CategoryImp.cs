using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace JamesThewAPI.Repository
{
    public class CategoryImp : ICategory
    {
        private readonly ProjectS3Context _dbContext;
        public CategoryImp(ProjectS3Context dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Category> AddCategoryAsync(Category category)
        {
            if(category != null)
            {
                await _dbContext.Categories.AddAsync(category);
                await _dbContext.SaveChangesAsync();
                return category;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteCategoryAsync(int cId)
        {
            var cateDb = await _dbContext.Categories.FindAsync(cId);
            if(cateDb != null)
            {
                _dbContext.Categories.Remove(cateDb);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryAsync(int cId)
        {
            var cateDb = await _dbContext.Categories.FindAsync(cId);
            return (cateDb != null) ? cateDb : null;
        }

        public async Task<Category> UpdateCategoryAsync(Category category)
        {
            var cateDb = await _dbContext.Categories.FindAsync(category.CId);
            if (cateDb != null)
            {
                _dbContext.Entry(cateDb).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return category;
            }
            else
            {
                return null;
            }
		}
    }
}
