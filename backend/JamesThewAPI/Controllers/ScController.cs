using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.ModelUtility.Rating;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScController : ControllerBase
    {

        private readonly ISubmissionContest scRepo;
        public ScController(ISubmissionContest scRepo)
        {
            this.scRepo = scRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomRespone<IEnumerable<SubmissionContest>>>> GetAllSC()
        {
            try
            {
                var resources = await scRepo.GetAllSC();
                if (resources != null && resources.Any())
                {
                    var response = new CustomRespone<IEnumerable<SubmissionContest>>
                            (StatusCodes.Status200OK, "Get List Submissive Contest successfully", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<IEnumerable<SubmissionContest>>(StatusCodes.Status404NotFound, "not found result or result empty", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<IEnumerable<SubmissionContest>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpGet("{ContestId}")]
        public async Task<ActionResult<CustomRespone<IEnumerable<SubmissionContest>>>> GetSCById(int ContestId)
        {
            try
            {
                var resources = await scRepo.GetSCById(ContestId);
                if (resources != null)
                {
                    var response = new CustomRespone<IEnumerable<SubmissionContest>>
                            (StatusCodes.Status200OK, "Get Submissive Contest successfully", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<SubmissionContest>(StatusCodes.Status404NotFound, "not found result or result empty", null, "Can't find Id to get!!!");
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<SubmissionContest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
        [HttpPost]
        public async Task<ActionResult<CustomRespone<SubmissionContest>>> AddSC([FromForm] SubmissionContest sc, IFormFile file)
        {
            try
            {
                var resources = await scRepo.AddSC(sc, file);
                if (resources == null)
                {
                    var response = new CustomRespone<SubmissionContest>(400, "Create Submissive form failed!!!", null, null);
                    return NotFound(response);
                }
                else
                {
                    var response = new CustomRespone<SubmissionContest>
                            (StatusCodes.Status201Created, "Submissive form created", resources, null);
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<SubmissionContest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
        [HttpPut]
        public async Task<ActionResult<CustomRespone<Contest>>> UpdateSC([FromForm] SubmissionContest sc, IFormFile file)
        {
            try
            {
                var resources = await scRepo.UpdateSC(sc, file);
                if (resources != null)
                {
                    var response = new CustomRespone<SubmissionContest>
                            (StatusCodes.Status200OK, "Submissive contest updated", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<SubmissionContest>(StatusCodes.Status404NotFound, "Update Contest failed!!!!!!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<SubmissionContest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpDelete("{ScId}")]
        public async Task<ActionResult<CustomRespone<SubmissionContest>>> DeleteSC(int ScId)
        {
            try
            {
                var resources = await scRepo.DeleteSC(ScId);
                if (resources != false)
                {
                    var response = new CustomRespone<SubmissionContest>
                            (StatusCodes.Status200OK, "Delete Submissive Contest successfully", null, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<SubmissionContest>(StatusCodes.Status404NotFound, "Delete Submissive Contest failed!!!", null, "Can't find id to delete!!!");
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<SubmissionContest>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
        [HttpGet("GetAvgScore")]
        public async Task<IEnumerable<TotalRatingModel>> GetAvgScore()
        {
            var resources = await scRepo.GetAverageScore();
            return resources;
        }
    }
}
