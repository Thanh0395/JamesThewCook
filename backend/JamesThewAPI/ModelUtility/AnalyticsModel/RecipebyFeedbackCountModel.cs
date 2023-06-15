namespace JamesThewAPI.ModelUtility.AnalyticsModel
{
	public class RecipebyFeedbackCountModel
	{
        public int recipeId { get; set; }
        public string recipeTitle { get; set; }
        public int recipeIdCount { get; set; }
        public string recipeImg { get; set; }
        public bool? IsFree { get; set; }
    }
}
