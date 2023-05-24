using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Resources;
using System.Security.Cryptography;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _cateRepo;
        public CategoryController(ICategory cateRepo)
        {
            _cateRepo = cateRepo;
        }
        [HttpGet]
        public async Task<ActionResult<CustomRespone<IEnumerable<Category>>>> GetAllCategories()
        {
			try
			{
				var resources = await _cateRepo.GetCategoriesAsync();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<Category>>
							(StatusCodes.Status200OK, "Get list Category successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Category>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<Category>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("{cId}")]
		public async Task<ActionResult<CustomRespone<Category>>> GetCategory(int cId)
		{
			try
			{
				var resources = await _cateRepo.GetCategoryAsync(cId);
				if (resources != null)
				{
					var response = new CustomRespone<Category>
							(StatusCodes.Status200OK, "Get Category successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Category>(StatusCodes.Status404NotFound, "not found result or result empty", null, "Can't find cId to get!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Category>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
		[HttpPost]
		public async Task<ActionResult<CustomRespone<Category>>> AddCategory(Category category)
		{
			try
			{
				var resources = await _cateRepo.AddCategoryAsync(category);
				if (resources != null)
				{
					var response = new CustomRespone<Category>
							(StatusCodes.Status200OK, "Category created", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Category>(StatusCodes.Status404NotFound, "Create Category failed!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Category>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
		[HttpPut]
		public async Task<ActionResult<CustomRespone<Category>>> UpdateCategory(Category category)
		{
			try
			{
				var resources = await _cateRepo.UpdateCategoryAsync(category);
				if (resources != null)
				{
					var response = new CustomRespone<Category>
							(StatusCodes.Status200OK, "Category updated", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Category>(StatusCodes.Status404NotFound, "Update Category failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Category>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpDelete("{cId}")]
		public async Task<ActionResult<CustomRespone<Category>>> DeleteCategory(int cId)
		{
			try
			{
				var resources = await _cateRepo.DeleteCategoryAsync(cId);
				if (resources != false)
				{
					var response = new CustomRespone<Category>
							(StatusCodes.Status200OK, "Delete Category successfully", null, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Category>(StatusCodes.Status404NotFound, "Delete Category failed!!!", null, "Can't find cId to delete!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Category>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
	}
}
