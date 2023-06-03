using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.ModelUtility.FIleService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MultiFileController : ControllerBase
	{
		private readonly IMultiFIle _multiFileRepo;
		public MultiFileController(IMultiFIle multiFileRepo)
		{
			this._multiFileRepo = multiFileRepo;
		}

		[HttpGet]
		public async Task<ActionResult<CustomRespone<IEnumerable<ImgRecipe>>>> GetAllListImageRecipe()
		{
			try
			{
				var resources = await _multiFileRepo.GetListImageRecipe();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<ImgRecipe>>
							(StatusCodes.Status200OK, "Get list Image ImgRecipe successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<ImgRecipe>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<ImgRecipe>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpPost]
		public async Task<ActionResult<CustomRespone<ImgRecipe>>> CreateMultiImage([FromForm] int rId, List<IFormFile> files)
		{
			try
			{
				var resources = await _multiFileRepo.CreateMultiImage(files, rId);
				if (resources != false)
				{
					var response = new CustomRespone<ImgRecipe>
							(StatusCodes.Status201Created, "ImgRecipe created", null, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<ImgRecipe>(StatusCodes.Status404NotFound, "Create ImgRecipe failed!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<ImgRecipe>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("{rId}")]
		public async Task<ActionResult<CustomRespone<IEnumerable<ImgRecipe>>>> GetImagesByRecipeId(int rId)
		{
			try
			{
				var resources = await _multiFileRepo.GetImagesByRecipeId(rId);
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<ImgRecipe>>
							(StatusCodes.Status200OK, "Get list Image ImgRecipe successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<ImgRecipe>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<ImgRecipe>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpDelete("{rId}")]
		public async Task<ActionResult<CustomRespone<ImgRecipe>>> DeleteImagesByRecipeId(int rId)
		{
			try
			{
				var resources = await _multiFileRepo.DeleteImagesByRecipeId(rId);
				if (resources != false)
				{
					var response = new CustomRespone<ImgRecipe>
							(StatusCodes.Status201Created, "ImgRecipe deleted", null, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<ImgRecipe>(StatusCodes.Status404NotFound, "deleted ImgRecipe failed!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<ImgRecipe>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
	}
}
