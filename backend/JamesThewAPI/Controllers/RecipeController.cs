using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.AnalyticsModel;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RecipeController : ControllerBase
	{
		private readonly IRecipe _recipeRepo;
		public RecipeController(IRecipe recipeRepo)
		{
			this._recipeRepo = recipeRepo;
		}

		[HttpGet]
		public async Task<ActionResult<CustomRespone<IEnumerable<Recipe>>>> GetAllRecipies()
		{
			try
			{
				var resources = await _recipeRepo.GetRecipiesAsync();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<Recipe>>
							(StatusCodes.Status200OK, "Get list Recipe successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("{rId}")]
		public async Task<ActionResult<CustomRespone<Recipe>>> GetRecipe(int rId)
		{
			try
			{
				var resources = await _recipeRepo.GetRecipeAsync(rId);
				if (resources != null)
				{
					var response = new CustomRespone<Recipe>
							(StatusCodes.Status200OK, "Get Recipe successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Recipe>(StatusCodes.Status404NotFound, "not found result or result empty", null, "Can't find rId to get!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Recipe>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
		[HttpPost]
		public async Task<ActionResult<CustomRespone<Recipe>>> AddRecipe([FromForm] Recipe Recipe, IFormFile file)
		{
			try
			{
				var resources = await _recipeRepo.AddRecipeAsync(Recipe, file);
				if (resources != null)
				{
					var response = new CustomRespone<Recipe>
							(StatusCodes.Status201Created, "Recipe created", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Recipe>(StatusCodes.Status404NotFound, "Create Recipe failed!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Recipe>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpPut]
		public async Task<ActionResult<CustomRespone<Recipe>>> UpdateRecipe([FromForm] Recipe Recipe, IFormFile ? file)
		{
			try
			{
				var resources = await _recipeRepo.UpdateRecipeAsync(Recipe, file);
				if (resources != null)
				{
					var response = new CustomRespone<Recipe>
							(StatusCodes.Status200OK, "Recipe updated", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Recipe>(StatusCodes.Status404NotFound, "Update Recipe failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Recipe>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpDelete("{rId}")]
		public async Task<ActionResult<CustomRespone<Recipe>>> DeleteRecipe(int rId)
		{
			try
			{
				var resources = await _recipeRepo.DeleteRecipeAsync(rId);
				if (resources != false)
				{
					var response = new CustomRespone<Recipe>
							(StatusCodes.Status200OK, "Delete Recipe successfully", null, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Recipe>(StatusCodes.Status404NotFound, "Delete Recipe failed!!!", null, "Can't find rId to delete!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Recipe>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("recent-recipe")]
		public async Task<ActionResult<CustomRespone<Recipe>>> GetRecentRecipe()
		{
			try
			{
				var resources = await _recipeRepo.GetRecentRecipe();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<Recipe>>
							(StatusCodes.Status200OK, "Get list Recent Recipe successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);

			}
		}

		[HttpGet("categories-by-recipe-count")]
		public async Task<ActionResult<CustomRespone<RecipeCategoryModel>>> GetCategoryByRecipeCount()
		{
			try
			{
				var resources = await _recipeRepo.GetCategoryByRecipeCount();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<RecipeCategoryModel>>
							(StatusCodes.Status200OK, "Get list Category name by recipe count successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<RecipeCategoryModel>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<RecipeCategoryModel>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);

			}
		}

		[HttpGet("Recipes-by-uId/{uId}")]
		public async Task<ActionResult<CustomRespone<IEnumerable<Recipe>>>> GetListRecipeByUserId(int uId)
		{
			try
			{
				var resources = await _recipeRepo.GetListRecipeByUserId(uId);
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<Recipe>>
							(StatusCodes.Status200OK, "Get list Recipe by user id successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Recipe>>(StatusCodes.Status200OK, "Success", Enumerable.Empty<Recipe>(), null);
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
