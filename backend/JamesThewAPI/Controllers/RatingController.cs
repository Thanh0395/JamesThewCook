using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {

        private readonly IRating ratingRepo;
        public RatingController(IRating ratingRepo)
        {
            this.ratingRepo = ratingRepo;
        }
        [HttpPost]
        public async Task<ActionResult<CustomRespone<Rating>>> AddRating(Rating rating)
        {
            try
            {
                var resources = await ratingRepo.AddRating(rating);
                if (resources == null)
                {
                    var response = new CustomRespone<Rating>(400, "Rating failed!!!", null, null);
                    return NotFound(response);
                }
                else
                {
                    var response = new CustomRespone<Rating>
                            (StatusCodes.Status201Created, "Rating successfully", resources, null);
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Rating>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
    }
}
