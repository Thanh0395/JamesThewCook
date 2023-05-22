﻿using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
    public class CategoryImp : ICategory
    {
        private readonly ProjectS3Context _dbContext;
        public CategoryImp(ProjectS3Context dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Category> AddCategoryAsync(Category category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteCategoryAsync(int CId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public Task<Category> GetCategoryAsync(int CId)
        {
            throw new NotImplementedException();
        }

        public Task<Category> UpdateCategoryAsync(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
