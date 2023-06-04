using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.AnalyticsModel;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;

namespace JamesThewAPI.Repository
{
	public class RecipeFeedbackImp : IRecipeFeedback
	{
		private readonly ProjectS3Context _dbContext;
        public RecipeFeedbackImp(ProjectS3Context dbContext)
        {
			this._dbContext = dbContext;
        }
        public async Task<RecipeFeedback> AddRecipeFeedback(RecipeFeedback recipeFeedback)
		{
			if (recipeFeedback != null)
			{
				recipeFeedback.CreatedAt = DateTime.Now;
				await _dbContext.RecipeFeedbacks.AddAsync(recipeFeedback);
				await _dbContext.SaveChangesAsync();
				return recipeFeedback;
			}
			else
			{
				return null;
			}
		}

		public async Task<IEnumerable<RecipeFeedback>> GetAllRecipieFeedback()
		{
			return await _dbContext.RecipeFeedbacks.ToListAsync();
		}

		public async Task<RecipeFeedback> GetRecipeFeedback(int rfbId)
		{
			var recipeFeedbackDb = await _dbContext.RecipeFeedbacks.FindAsync(rfbId);
			return (recipeFeedbackDb != null) ? recipeFeedbackDb : null;
		}

		public async Task<RecipeFeedback> UpdateRecipeFeedback(RecipeFeedback recipeFeedback)
		{
			var recipeFeedbackDb = await _dbContext.RecipeFeedbacks.FindAsync(recipeFeedback.RfbId);
			if(recipeFeedbackDb != null)
			{
				recipeFeedback.CreatedAt = recipeFeedbackDb.CreatedAt;
				recipeFeedback.UpdatedAt = recipeFeedbackDb.UpdatedAt;
				_dbContext.Entry(recipeFeedback).State = EntityState.Modified;
				await _dbContext.SaveChangesAsync();
				return recipeFeedback;
			}
			else
			{
				return null;
			}
		}

		public async Task<bool> DeleteRecipeFeedback(int rfbId)
		{
			var recipeFeedbackDb = await _dbContext.RecipeFeedbacks.FindAsync(rfbId);
			if(recipeFeedbackDb != null)
			{
				_dbContext.RecipeFeedbacks.Remove(recipeFeedbackDb);
				await _dbContext.SaveChangesAsync();
				return true;
			}
			else { return false; }
		}

		public async Task<IEnumerable<RecipeFeedback>> GetListRecipeFeedbackByRecipeId(int rId)
		{
			return await _dbContext.RecipeFeedbacks
			.Where(r => r.RId == rId)
			.ToListAsync();
		}

		public async Task<IEnumerable<RecipebyFeedbackCountModel>> GetListByRecipeIdByRIdCount()
		{
			var query = await _dbContext.RecipeFeedbacks
				.GroupBy(feedback => feedback.RId)
				.Select(group => new RecipebyFeedbackCountModel
				{
					recipeId = group.Key.Value,
					recipeTitle = string.Empty,
					recipeIdCount = group.Count()
				})
				.ToListAsync();
			foreach (var item in query)
			{
				var recipe = await _dbContext.Recipes.FindAsync(item.recipeId);
				if (recipe != null)
					item.recipeTitle = recipe.Title;
			}

			return query;

		}

		public async Task<IEnumerable<RecipeFeedback>> GetRecipeFeedbackByRecipeId(int rId)
		{
			var recipeFeedbacks = await _dbContext.RecipeFeedbacks
				.Where(feedback => feedback.RId == rId)
				.ToListAsync();

			return recipeFeedbacks;
		}
	}
}
