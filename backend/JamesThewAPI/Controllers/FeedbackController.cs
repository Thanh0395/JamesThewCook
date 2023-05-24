using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedback _feedbackRepo;
        public FeedbackController( IFeedback feedback)
        {
            this._feedbackRepo = feedback;
        }

        [HttpGet]
        public async Task<ActionResult<CustomRespone<IEnumerable<Feedback>>>> GetAllFeedbacks()
        {

            try
            {
                var result = await _feedbackRepo.GetAllFeedbacks();
                if (result != null)
                {
                    var response = new CustomRespone<IEnumerable<Feedback>>(
                        StatusCodes.Status200OK,
                        "Get List Feedbacks Successfully!",
                        result,
                        null
                        );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<IEnumerable<Feedback>>(
                        StatusCodes.Status404NotFound,
                        "Get List Feedbacks Failed!",
                        null,
                        null
                        );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<IEnumerable<Feedback>>(
                      StatusCodes.Status500InternalServerError,
                      "System Error!",
                      null,
                      ex.Message
                      );
                return BadRequest(response);
            }
        }

        [HttpGet("{fbId}")]
        public async Task<ActionResult<CustomRespone<Feedback>>> GetFeedback(int fbId)
        {
            try
            {
                var result = await _feedbackRepo.GetFeedback(fbId);
                if (result != null)
                {
                    var response = new CustomRespone<Feedback>(
                                            StatusCodes.Status200OK,
                                            "Get Feedback by id Successfully!",
                                            result,
                                            null
                                            );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status404NotFound,
                        "Get List Posts Failed!",
                        null,
                        null
                        );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Feedback>(
                                   StatusCodes.Status500InternalServerError,
                                   "System Error!",
                                   null,
                                   ex.Message
                                   );
                return BadRequest(response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CustomRespone<Feedback>>> AddFeedback(Feedback feedback)
        {
            try
            {
                var result = await _feedbackRepo.AddFeedback(feedback);
                if (result != null)
                {
                    var response = new CustomRespone<Feedback>(
                                     StatusCodes.Status200OK,
                                     "Create Feedback Successfully!",
                                     result,
                                     null
                                     );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Feedback>(
                        StatusCodes.Status404NotFound,
                        "Create Feedback Undone!",
                        null,
                        "Cannot create feedback"
                        );
                    return NotFound(response);
                }
            }
            catch (Exception  ex)
            {

                var response = new CustomRespone<Feedback>(
                              StatusCodes.Status500InternalServerError,
                              "System Error!",
                              null,
                              ex.Message
                              );
                return BadRequest(response);
            }
        }

        [HttpDelete("{fbId}")]
        public async Task<ActionResult<CustomRespone<Feedback>>> DeleteFeedback(int fbId)
        {
            try
            {
                var result = await _feedbackRepo.DeleteFeedback(fbId);
                if (result != false)
                {
                    var response = new CustomRespone<Feedback>(
                             StatusCodes.Status200OK,
                             "Delete Feedback Successfully!",
                             null,
                             null
                             );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Feedback>(
                            StatusCodes.Status404NotFound,
                            "Delete Feedback Undone!",
                            null,
                            null
                            );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Feedback>(
                            StatusCodes.Status500InternalServerError,
                            "System Error!",
                            null,
                            ex.Message
                            );
                return BadRequest(response);
            }
        }

        [HttpPut]
        public async Task<ActionResult<CustomRespone<Feedback>>> Update(Feedback feedback)
        {
            try
            {
                var result = await _feedbackRepo.UpdateFeedback(feedback);
                if (result != null)
                {
                    var response = new CustomRespone<Feedback>(
                         StatusCodes.Status200OK,
                         "Update Feedback Successfully!",
                         result,
                         null
                         );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Feedback>(
                           StatusCodes.Status404NotFound,
                           "Update Feedback Undone!",
                           null,
                           "Can not update feedback!"
                           );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Feedback>(
                               StatusCodes.Status500InternalServerError,
                               "System Error!",
                               null,
                               ex.Message
                               );
                return BadRequest(response);
            }
        }
    }
}
