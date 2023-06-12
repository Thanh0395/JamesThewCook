namespace JamesThewAPI.ModelUtility.SearchRecipeAndContest
{
	public class SearchRecipeAndPostModel
	{
        public int searchId { get; set; }
        public int ? recipeId { get; set; }

        public int? postId { get; set; }

        public string? recipeTitle { get; set; }
        public string? postTitle { get; set; }
        public string? recipeType { get; set; }
        public string? postType { get; set; }
        public string? recipeImage { get; set; }
        public string? postImage { get; set; }

        public  bool? IsFree { get; set; }
    }
}
