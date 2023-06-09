using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContestController : ControllerBase
    {
        private readonly IContest contestRepo;
        public ContestController(IContest contestRepo)
        {
            this.contestRepo = contestRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomRespone<IEnumerable<Contest>>>> GetAllContest()
        {
            try
            {
                var resources = await contestRepo.GetAllContest();
                if (resources != null && resources.Any())
                {
                    var response = new CustomRespone<IEnumerable<Contest>>
                            (StatusCodes.Status200OK, "Get List Contest successfully", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<IEnumerable<Contest>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<IEnumerable<Contest>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpGet("{ContestId}")]
        public async Task<ActionResult<CustomRespone<Contest>>> GetContestById(int ContestId)
        {
            try
            {
                var resources = await contestRepo.GetContestById(ContestId);
                if (resources != null)
                {
                    var response = new CustomRespone<Contest>
                            (StatusCodes.Status200OK, "Get Contest successfully", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Contest>(StatusCodes.Status404NotFound, "not found result or result empty", null, "Can't find Id to get!!!");
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Contest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
        [HttpPost]
        public async Task<ActionResult<CustomRespone<Contest>>> AddContest([FromForm] Contest contest, IFormFile? file)
        {
            try
            {
                var resources = await contestRepo.AddContest(contest, file);
                if (resources != null)
                {
                    var response = new CustomRespone<Contest>
                            (StatusCodes.Status201Created, "Contest created", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Contest>(StatusCodes.Status404NotFound, "Create Contest failed!!!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Contest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
        [HttpPut]
        public async Task<ActionResult<CustomRespone<Contest>>> UpdateContest([FromForm] Contest contest, IFormFile? file)
        {
            try
            {
                var resources = await contestRepo.UpdateContest(contest, file);
                if (resources != null)
                {
                    var response = new CustomRespone<Contest>
                            (StatusCodes.Status200OK, "Contest updated", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Contest>(StatusCodes.Status404NotFound, "Update Contest failed!!!!!!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Contest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpDelete("{ContestId}")]
        public async Task<ActionResult<CustomRespone<Contest>>> DeleteContest(int ContestId)
        {
            try
            {
                var resources = await contestRepo.DeleteContest(ContestId);
                if (resources != false)
                {
                    var response = new CustomRespone<Contest>
                            (StatusCodes.Status200OK, "Delete Contest successfully", null, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Contest>(StatusCodes.Status404NotFound, "Delete Contest failed!!!", null, "Can't find id to delete!!!");
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Contest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
    }
}
