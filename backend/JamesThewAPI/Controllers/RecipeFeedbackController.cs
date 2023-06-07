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
	public class RecipeFeedbackFeedbackController : ControllerBase
	{
		private readonly IRecipeFeedback _recipeFeedbackRepo;
		public RecipeFeedbackFeedbackController(IRecipeFeedback RecipeFeedbackRepo)
		{
			this._recipeFeedbackRepo = RecipeFeedbackRepo;
		}

		[HttpGet]
		public async Task<ActionResult<CustomRespone<IEnumerable<RecipeFeedback>>>> GetAllRecipies()
		{
			try
			{
				var resources = await _recipeFeedbackRepo.GetAllRecipieFeedback();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<RecipeFeedback>>
							(StatusCodes.Status200OK, "Get list RecipeFeedback successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<RecipeFeedback>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<RecipeFeedback>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("{rfbId}")]
		public async Task<ActionResult<CustomRespone<Recipe>>> GetRecipeFeedback(int rfbId)
		{
			try
			{
				var resources = await _recipeFeedbackRepo.GetRecipeFeedback(rfbId);
				if (resources != null)
				{
					var response = new CustomRespone<RecipeFeedback>
							(StatusCodes.Status200OK, "Get Recipe Feedback successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status404NotFound, "not found result or result empty", null, "Can't find rfbId to get!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpPost]
		public async Task<ActionResult<CustomRespone<RecipeFeedback>>> PostRecipeFeedBack(RecipeFeedback recipeFeedback)
		{
			try
			{
				var resources = await _recipeFeedbackRepo.AddRecipeFeedback(recipeFeedback);
				if (resources != null)
				{
					var response = new CustomRespone<RecipeFeedback>
							(StatusCodes.Status201Created, "Recipe Feedback created", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status404NotFound, "Create Recipe Feedback failed!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpPut]
		public async Task<ActionResult<CustomRespone<RecipeFeedback>>> PutRecipeFeedback(RecipeFeedback recipeFeedback)
		{
			try
			{
				var resources = await _recipeFeedbackRepo.UpdateRecipeFeedback(recipeFeedback);
				if (resources != null)
				{
					var response = new CustomRespone<RecipeFeedback>
							(StatusCodes.Status200OK, "Recipe Feedback updated", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status404NotFound, "Update Recipe Feedback failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpDelete("{rfbId}")]
		public async Task<ActionResult<CustomRespone<RecipeFeedback>>> DeleteRecipe(int rfbId)
		{
			try
			{
				var resources = await _recipeFeedbackRepo.DeleteRecipeFeedback(rfbId);
				if (resources != false)
				{
					var response = new CustomRespone<RecipeFeedback>
							(StatusCodes.Status200OK, "Delete Recipe Feedback successfully", null, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status404NotFound, "Delete Recipe failed!!!", null, "Can't find rfbId to delete!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<RecipeFeedback>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("GetListByRecipeIdByRIdCount")]
		public async Task<ActionResult<CustomRespone<IEnumerable<RecipebyFeedbackCountModel>>>> GetListByRecipeIdByRIdCount()
		{
			try
			{
				var resources = await _recipeFeedbackRepo.GetListByRecipeIdByRIdCount();
				if (resources != null)
				{
					var response = new CustomRespone<IEnumerable<RecipebyFeedbackCountModel>>
							(StatusCodes.Status200OK, "GetListByRecipeIdByRIdCount succuess!", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<RecipebyFeedbackCountModel>>(StatusCodes.Status404NotFound, "Update Recipe Feedback failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<RecipebyFeedbackCountModel>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("GetRecipeFeedbackByRecipeId/{rId}")]
		public async Task<ActionResult<CustomRespone<IEnumerable<RecipeFeedback>>>> GetRecipeFeedbackByRecipeId(int rId)
		{
			try
			{
				var resources = await _recipeFeedbackRepo.GetRecipeFeedbackByRecipeId(rId);
				if (resources != null)
				{
					var response = new CustomRespone<IEnumerable<RecipeFeedback>>
							(StatusCodes.Status200OK, "GetRecipeFeedbackByRecipeId success!", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<RecipeFeedback>>(StatusCodes.Status404NotFound, "Update Recipe Feedback failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<RecipeFeedback>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
	}
}
