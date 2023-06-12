using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.ModelUtility.SearchRecipeAndContest;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SearchController : ControllerBase
	{
		private readonly ProjectS3Context _dbContext;
        public SearchController(ProjectS3Context dbContext)
        {
			this._dbContext = dbContext;
        }
        [HttpGet]
		public async Task<ActionResult<CustomRespone<IEnumerable<SearchRecipeAndPostModel>>>> GetListSearch(string keyword) 
		{
			var lowerKeyword = keyword.ToLower();
			var matchingRecipes = await _dbContext.Recipes
				.Where(r => r.Title.ToLower().Contains(lowerKeyword))
				.Select(r => new SearchRecipeAndPostModel
				{
					searchId = r.RId,
					recipeId = r.RId,
					recipeTitle = r.Title,
					recipeType = "recipe",
					recipeImage = r.FeatureImage,
					postId = null,
					postTitle = null,
					postType = null,
					postImage = null,
					IsFree = r.IsFree,
				}).ToListAsync() ;
			var matchingPost = await _dbContext.Posts
				.Where(p => p.Title.ToLower().Contains(lowerKeyword))
				.Select(p => new SearchRecipeAndPostModel
				{
					searchId = p.PId,
					postId = p.PId,
					postTitle = p.Title,
					postType = p.Type,
					postImage = p.FeatureImage,
					recipeId = null,
					recipeTitle= null,
					recipeType = null,
					recipeImage= null,
					IsFree = p.IsFree,
				}).ToListAsync();
			var searchResult = matchingRecipes.Concat(matchingPost).ToList() ;
			try
			{
				if (searchResult != null && searchResult.Any())
				{
					var response = new CustomRespone<IEnumerable<SearchRecipeAndPostModel>>
							(StatusCodes.Status200OK, "Get list search recipe and post by keyword successfully", searchResult, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status404NotFound, "Not found product to search", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);

			}

		}
	}
}
