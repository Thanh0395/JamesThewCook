using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CountryController : ControllerBase
	{
		private readonly ICountry _countryRepo;
		public CountryController(ICountry countryRepo)
		{
			_countryRepo = countryRepo;
		}
		[HttpGet]
		public async Task<ActionResult<CustomRespone<IEnumerable<Country>>>> GetAllCategories()
		{
			try
			{
				var resources = await _countryRepo.GetCountriesAsync();
				if (resources != null && resources.Any())
				{
					var response = new CustomRespone<IEnumerable<Country>>
							(StatusCodes.Status200OK, "Get list Country successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Country>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<Country>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpGet("{countryId}")]
		public async Task<ActionResult<CustomRespone<Country>>> GetCountry(int countryId)
		{
			try
			{
				var resources = await _countryRepo.GetCountryAsync(countryId);
				if (resources != null)
				{
					var response = new CustomRespone<Country>
							(StatusCodes.Status200OK, "Get Country successfully", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Country>(StatusCodes.Status404NotFound, "not found result or result empty", null, "Can't find countryId to get!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Country>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
		[HttpPost]
		public async Task<ActionResult<CustomRespone<Country>>> AddCountry(Country country)
		{
			try
			{
				var resources = await _countryRepo.AddCountryAsync(country);
				if (resources != null)
				{
					var response = new CustomRespone<Country>
							(StatusCodes.Status200OK, "Country created", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Country>(StatusCodes.Status404NotFound, "Create Country failed!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Country>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
		[HttpPut]
		public async Task<ActionResult<CustomRespone<Country>>> UpdateCountry(Country country)
		{
			try
			{
				var resources = await _countryRepo.UpdateCountryAsync(country);
				if (resources != null)
				{
					var response = new CustomRespone<Country>
							(StatusCodes.Status200OK, "Country updated", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Country>(StatusCodes.Status404NotFound, "Update Country failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Country>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}

		[HttpDelete("{countryId}")]
		public async Task<ActionResult<CustomRespone<Country>>> DeleteCountry(int countryId)
		{
			try
			{
				var resources = await _countryRepo.DeleteCountryAsync(countryId);
				if (resources != false)
				{
					var response = new CustomRespone<Country>
							(StatusCodes.Status200OK, "Delete Country successfully", null, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<Country>(StatusCodes.Status404NotFound, "Delete Country failed!!!", null, "Can't find countryId to delete!!!");
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<Country>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
	}
}
