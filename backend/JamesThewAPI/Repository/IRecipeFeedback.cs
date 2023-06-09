using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.AnalyticsModel;

namespace JamesThewAPI.Repository
{
	public interface IRecipeFeedback
	{
		Task<IEnumerable<RecipeFeedback>> GetAllRecipieFeedback();
		Task<RecipeFeedback> GetRecipeFeedback(int rfbId);
		Task<RecipeFeedback> AddRecipeFeedback(RecipeFeedback recipeFeedback);
		Task<RecipeFeedback> UpdateRecipeFeedback(RecipeFeedback recipeFeedback);
		Task<bool> DeleteRecipeFeedback(int rfbId);
		Task<IEnumerable<RecipeFeedback>> GetListRecipeFeedbackByRecipeId(int rId);
		Task<IEnumerable<RecipebyFeedbackCountModel>> GetListByRecipeIdByRIdCount();

		Task<IEnumerable<RecipeFeedback>> GetRecipeFeedbackByRecipeId(int rId);
	}
}
